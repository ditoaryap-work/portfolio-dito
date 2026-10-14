import type { WindowId } from '../data/desktop';
import { revealWindow } from './motion';

type WindowState = {
  element: HTMLElement;
  task: HTMLButtonElement;
  open: boolean;
  minimized: boolean;
};

/** Modeless window behavior stays here; panels don't own desktop state. */
export class WindowManager {
  private windows = new Map<WindowId, WindowState>();
  private active: WindowId | null = null;
  private zIndex = 10;
  private layer: HTMLElement;

  constructor(layer: HTMLElement) {
    this.layer = layer;
    layer.querySelectorAll<HTMLElement>('[data-window]').forEach((element) => {
      const id = element.dataset.window as WindowId;
      const task = document.querySelector<HTMLButtonElement>(
        `[data-task="${id}"]`,
      );
      if (!task) return;
      this.windows.set(id, {
        element,
        task,
        open: !element.hidden,
        minimized: false,
      });
      element.addEventListener('pointerdown', () => this.bringToFront(id));
      element.addEventListener('focusin', () => this.bringToFront(id));
      element
        .querySelectorAll<HTMLButtonElement>('[data-window-action]')
        .forEach((button) => {
          button.addEventListener('click', () => {
            switch (button.dataset.windowAction) {
              case 'close':
                this.close(id);
                break;
              case 'minimize':
                this.minimize(id);
                break;
              case 'maximize':
                this.maximize(id);
                break;
            }
          });
        });
      task.addEventListener('click', () =>
        this.active === id && !this.windows.get(id)?.minimized
          ? this.minimize(id)
          : this.open(id),
      );
      this.enableDragging(id, element);
    });
    this.bringToFront('welcome');
  }

  open(id: WindowId): void {
    const state = this.windows.get(id);
    if (!state) return;
    const wasVisible = state.open && !state.minimized;
    state.open = true;
    state.minimized = false;
    state.element.hidden = false;
    state.task.hidden = false;
    this.bringToFront(id);
    state.element.focus({ preventScroll: true });
    if (!wasVisible) revealWindow(state.element);
  }

  close(id: WindowId, restoreFocus = true): void {
    const state = this.windows.get(id);
    if (!state) return;
    state.open = false;
    state.minimized = false;
    state.element.hidden = true;
    state.task.hidden = true;
    if (this.active === id) this.focusNext();
    if (restoreFocus && !this.active) {
      const launcher = [
        ...document.querySelectorAll<HTMLButtonElement>(
          `[data-open-window="${id}"]`,
        ),
      ].find((button) => button.offsetParent !== null);
      (launcher ?? document.getElementById('start-button'))?.focus();
    }
  }

  minimize(id: WindowId): void {
    const state = this.windows.get(id);
    if (!state) return;
    state.minimized = true;
    state.element.hidden = true;
    if (this.active === id) this.focusNext();
    state.task.focus();
  }

  maximize(id: WindowId): void {
    const state = this.windows.get(id);
    if (!state) return;
    const maximized = state.element.classList.toggle('is-maximized');
    const button = state.element.querySelector<HTMLButtonElement>(
      '[data-window-action="maximize"]',
    );
    const label = maximized
      ? button?.dataset.restoreLabel ?? 'Restore'
      : button?.dataset.maximizeLabel ?? 'Maximize';
    button?.setAttribute(
      'aria-label',
      `${label} ${state.element.querySelector('.title-bar-text')?.textContent?.trim()}`,
    );
    button?.classList.toggle('restore', maximized);
    button?.classList.toggle('maximize', !maximized);
    this.bringToFront(id);
  }

  closeAll(): void {
    this.windows.forEach((_, id) => this.close(id, false));
  }
  closeActive(): void {
    if (this.active) this.close(this.active);
  }

  private bringToFront(id: WindowId): void {
    const state = this.windows.get(id);
    if (!state || !state.open || state.minimized) return;
    this.active = id;
    state.element.style.zIndex = String(++this.zIndex);
    this.windows.forEach((item, key) => {
      item.element.classList.toggle('is-inactive', key !== id);
      item.task.classList.toggle('is-active', key === id);
      item.task.setAttribute('aria-pressed', String(key === id));
    });
  }

  private focusNext(): void {
    this.active = null;
    let next: WindowId | null = null;
    let top = -1;
    this.windows.forEach((state, id) => {
      state.task.classList.remove('is-active');
      state.task.setAttribute('aria-pressed', 'false');
      if (
        state.open &&
        !state.minimized &&
        Number(state.element.style.zIndex) > top
      ) {
        top = Number(state.element.style.zIndex);
        next = id;
      }
    });
    if (next) {
      this.bringToFront(next);
      this.windows.get(next)?.element.focus({ preventScroll: true });
    }
  }

  private enableDragging(id: WindowId, element: HTMLElement): void {
    const handle = element.querySelector<HTMLElement>('[data-drag-handle]');
    if (!handle) return;
    handle.addEventListener('dblclick', (event) => {
      if (!(event.target as HTMLElement).closest('button')) this.maximize(id);
    });
    handle.addEventListener('pointerdown', (event) => {
      if (
        event.button !== 0 ||
        window.innerWidth <= 700 ||
        element.classList.contains('is-maximized') ||
        (event.target as HTMLElement).closest('button')
      )
        return;
      event.preventDefault();
      handle.setPointerCapture(event.pointerId);
      const startX = event.clientX;
      const startY = event.clientY;
      const left = element.offsetLeft;
      const top = element.offsetTop;
      const move = (pointer: PointerEvent) => {
        element.style.left = `${Math.max(0, Math.min(this.layer.clientWidth - element.offsetWidth, left + pointer.clientX - startX))}px`;
        element.style.top = `${Math.max(0, Math.min(this.layer.clientHeight - handle.offsetHeight - 10, top + pointer.clientY - startY))}px`;
      };
      const stop = () => {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('lostpointercapture', stop);
      };
      handle.addEventListener('pointermove', move);
      handle.addEventListener('lostpointercapture', stop, { once: true });
    });
  }
}
