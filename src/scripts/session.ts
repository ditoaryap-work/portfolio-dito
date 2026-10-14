import type { WindowManager } from './window-manager';
import { apps } from '../data/desktop';
import { copy, type Locale } from '../data/copy';
import { readStorage, writeStorage } from './storage';
import {
  animateDesktop,
  animateLoginEntrance,
  leaveLogin,
  runBootSequence,
} from './motion';

const sessionKey = 'ditoos.session.v2';

export function initSession(manager: WindowManager, locale: Locale) {
  const login = document.getElementById('login-screen');
  const workspace = document.getElementById('workspace');
  const input = document.querySelector<HTMLInputElement>('#visitor-name');
  if (!login || !workspace) return { showLogin: () => {} };
  const t = copy[locale];
  let entering = false;
  const updateGreeting = (name: string | null) =>
    document
      .querySelectorAll<HTMLElement>('[data-greeting]')
      .forEach((element) => {
        element.textContent = name
          ? locale === 'id'
            ? `Halo, ${name}. Anggap saja rumah sendiri.`
            : `Hey, ${name}. Make yourself at home.`
          : t.welcome.hello;
      });
  const savedName = readStorage('ditoos.visitor')?.slice(0, 32) || '';
  if (input) input.value = savedName;
  updateGreeting(savedName);

  const showLogin = () => {
    entering = false;
    manager.closeAll();
    workspace.inert = true;
    login.hidden = false;
    writeStorage(sessionKey, 'false', true);
    login.focus({ preventScroll: true });
  };
  const enter = async (name: string) => {
    if (entering) return;
    entering = true;
    if (input) input.value = name;
    writeStorage('ditoos.visitor', name);
    writeStorage(sessionKey, 'true', true);
    updateGreeting(name);
    await leaveLogin(login);
    const boot = document.getElementById('boot-screen');
    if (boot) await runBootSequence(boot);
    workspace.inert = false;
    manager.open('welcome');
    animateDesktop();
    entering = false;
  };
  document.getElementById('login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    void enter(input?.value.trim().slice(0, 32) || '');
  });
  document
    .querySelector('[data-enter-guest]')
    ?.addEventListener('click', () => void enter(''));

  const query = new URLSearchParams(location.search);
  const app = query.get('app');
  if (query.has('intro')) {
    showLogin();
    animateLoginEntrance(login);
  } else if (app || readStorage(sessionKey, true) === 'true') {
    login.hidden = true;
    workspace.inert = false;
    manager.close('welcome', false);
    manager.open(apps.find((item) => item.id === app)?.id ?? 'projects');
    animateDesktop();
  } else {
    showLogin();
    animateLoginEntrance(login);
  }
  return { showLogin };
}
