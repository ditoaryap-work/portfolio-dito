import type { WindowId } from '../data/desktop';
import { WindowManager } from './window-manager';
import { initSession } from './session';
import { initPortrait } from './portrait-reveal';
import type { Locale } from '../data/copy';

const locale: Locale = document.documentElement.lang === 'en' ? 'en' : 'id';

const layer = document.getElementById('window-layer');
const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');

if (layer && startButton && startMenu) {
  const manager = new WindowManager(layer);
  const session = initSession(manager, locale);
  const stopPortraits = [
    ...document.querySelectorAll<HTMLElement>('[data-portrait]'),
  ].map(initPortrait);
  document.addEventListener(
    'astro:before-swap',
    () => stopPortraits.forEach((stop) => stop()),
    { once: true },
  );

  const setStartMenu = (open: boolean) => {
    startMenu.hidden = !open;
    startButton.setAttribute('aria-expanded', String(open));
  };
  startButton.addEventListener('click', () => {
    setStartMenu(startMenu.hidden);
    if (!startMenu.hidden)
      startMenu.querySelector<HTMLButtonElement>('button')?.focus();
  });
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const trigger = target?.closest<HTMLElement>('[data-open-window]');
    if (trigger?.dataset.openWindow)
      manager.open(trigger.dataset.openWindow as WindowId);
    if (!target?.closest('#start-menu, #start-button') || trigger)
      setStartMenu(false);

    const filter = target?.closest<HTMLButtonElement>('[data-journey-filter]');
    const journey = filter?.closest<HTMLElement>('[data-journey]');
    if (filter && journey) {
      journey
        .querySelectorAll<HTMLButtonElement>('[data-journey-filter]')
        .forEach((button) =>
          button.setAttribute('aria-pressed', String(button === filter)),
        );
      journey
        .querySelectorAll<HTMLElement>('[data-journey-group]')
        .forEach((group) => {
          group.hidden =
            filter.dataset.journeyFilter !== 'all' &&
            group.dataset.journeyGroup !== filter.dataset.journeyFilter;
        });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (
      event.key !== 'Escape' ||
      !document.getElementById('login-screen')?.hidden
    )
      return;
    if (!startMenu.hidden) {
      setStartMenu(false);
      startButton.focus();
    } else manager.closeActive();
  });
  document
    .getElementById('restart-button')
    ?.addEventListener('click', () => {
      setStartMenu(false);
      session.showLogin();
    });

  const clock = document.querySelector<HTMLTimeElement>('#desktop-clock');
  const updateClock = () => {
    if (!clock) return;
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(now);
  };
  updateClock();
  window.setInterval(updateClock, 30_000);
  window.addEventListener('resize', () =>
    layer.querySelectorAll<HTMLElement>('[data-window]').forEach((element) => {
      element.style.removeProperty('left');
      element.style.removeProperty('top');
    }),
  );
}
