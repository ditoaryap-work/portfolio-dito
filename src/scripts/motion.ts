import { gsap } from 'gsap';

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function revealWindow(element: HTMLElement): void {
  gsap.killTweensOf(element);
  if (reducedMotion()) {
    gsap.set(element, {
      opacity: 1,
      scale: 1,
      clearProps: 'transform,opacity',
    });
    return;
  }
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.28,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    },
  );
}

export function animateDesktop(): void {
  if (reducedMotion()) return;
  gsap.fromTo(
    '.desktop-icon',
    { opacity: 0, y: 6 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.045,
      duration: 0.35,
      ease: 'power3.out',
      clearProps: 'all',
    },
  );
}

export function animateLoginEntrance(login: HTMLElement): void {
  if (reducedMotion()) return;
  gsap.fromTo(
    [
      login.querySelector('.login-wordmark'),
      login.querySelector('.login-introduction'),
      login.querySelector('.login-card'),
      login.querySelector('.login-footer'),
    ].filter(Boolean),
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    },
  );
}

export function runBootSequence(overlay: HTMLElement): Promise<void> {
  overlay.hidden = false;
  const progress = overlay.querySelector<HTMLElement>('.boot-progress span');
  const bar = overlay.querySelector<HTMLElement>('[role="progressbar"]');
  const enterButton =
    overlay.querySelector<HTMLButtonElement>('[data-boot-enter]');
  const skipButtons = [
    ...overlay.querySelectorAll<HTMLButtonElement>('[data-boot-skip]'),
  ];
  const footerSkip = overlay.querySelector<HTMLButtonElement>(
    '.boot-actions [data-boot-skip]',
  );
  const status = overlay.querySelector<HTMLElement>('[data-boot-status]');
  const rows = [...overlay.querySelectorAll<HTMLElement>('[data-boot-step]')];
  const readyMessage = overlay.dataset.bootReady ?? '';
  const stepDuration = 900;
  const setProgress = (value: number) => {
    bar?.setAttribute('aria-valuenow', String(Math.round(value)));
    if (progress)
      gsap.to(progress, {
        scaleX: value / 100,
        duration: reducedMotion() ? 0 : 0.24,
        ease: 'power2.out',
        overwrite: true,
      });
  };
  const setStep = (active: number) => {
    rows.forEach((row, index) => {
      row.dataset.state =
        index < active ? 'done' : index === active ? 'active' : 'waiting';
      if (index === active) row.setAttribute('aria-current', 'step');
      else row.removeAttribute('aria-current');
    });
    if (status) {
      const label = rows[active]?.dataset.bootLabel ?? '';
      status.textContent = `${active + 1} / ${rows.length}. ${label}`;
    }
    if (!reducedMotion() && active >= 0 && rows[active])
      gsap.fromTo(
        rows[active],
        { opacity: 0.6, y: 5 },
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
      );
  };
  gsap.killTweensOf(overlay);
  if (progress)
    gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
  if (reducedMotion()) gsap.set(overlay, { opacity: 1 });
  else
    gsap.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.24, ease: 'power2.out' },
    );

  return new Promise((resolve) => {
    let finished = false;
    let ready = false;
    let active = 0;
    let timer = 0;
    const cleanup = () => {
      skipButtons.forEach((button) =>
        button.removeEventListener('click', finish),
      );
      enterButton?.removeEventListener('click', finish);
      document.removeEventListener('keydown', onKeydown);
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      gsap.killTweensOf(overlay);
      if (progress) gsap.killTweensOf(progress);
      const hide = () => {
        overlay.hidden = true;
        gsap.set(overlay, { clearProps: 'opacity' });
        cleanup();
        resolve();
      };
      if (reducedMotion()) hide();
      else
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: hide,
        });
    };
    const complete = () => {
      if (finished || ready) return;
      ready = true;
      rows.forEach((row) => {
        row.dataset.state = 'done';
        row.removeAttribute('aria-current');
      });
      setProgress(100);
      if (status) status.textContent = readyMessage;
      if (enterButton) {
        enterButton.hidden = false;
        if (reducedMotion())
          gsap.set(enterButton, { clearProps: 'opacity,transform' });
        else
          gsap.fromTo(
            enterButton,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
              clearProps: 'all',
            },
          );
        enterButton.focus({ preventScroll: true });
      }
    };
    const tick = () => {
      if (finished || ready) return;
      if (active === rows.length - 1) {
        complete();
        return;
      }
      active += 1;
      setStep(active);
      setProgress(((active + 1) / Math.max(rows.length, 1)) * 100);
      timer = window.setTimeout(tick, stepDuration);
    };
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish();
    };
    skipButtons.forEach((button) => button.addEventListener('click', finish));
    enterButton?.addEventListener('click', finish);
    document.addEventListener('keydown', onKeydown);

    if (rows.length) {
      setStep(0);
      setProgress((1 / rows.length) * 100);
      footerSkip?.focus({ preventScroll: true });
      timer = window.setTimeout(tick, stepDuration);
    } else {
      complete();
    }
  });
}

export async function leaveLogin(element: HTMLElement): Promise<void> {
  if (!reducedMotion())
    await gsap.to(element, {
      opacity: 0,
      y: -12,
      duration: 0.35,
      ease: 'power3.inOut',
    });
  element.hidden = true;
  gsap.set(element, { clearProps: 'opacity,transform' });
}
