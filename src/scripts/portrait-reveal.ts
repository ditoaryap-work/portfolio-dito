type Dot = {
  x: number;
  y: number;
  shade: number;
  radius: number;
  reveal: number;
};

/** An original static-photo effect. No webcam, React runtime, or external requests. */
export function initPortrait(root: HTMLElement): () => void {
  const surface = root.querySelector<HTMLButtonElement>(
    '[data-portrait-surface]',
  );
  const image = root.querySelector<HTMLImageElement>('img');
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const context = canvas?.getContext('2d');
  if (!surface || !image || !canvas || !context) return () => {};

  const abort = new AbortController();
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0,
    height = 0,
    frame = 0,
    lastTime = 0;
  let dots: Dot[] = [];
  let pointer: { x: number; y: number } | null = null;
  let revealAll = false;
  let visible = true;
  let loaded = false;
  const step = 5;

  const paint = () => {
    context.clearRect(0, 0, width, height);
    for (const dot of dots) {
      context.globalAlpha = 1 - dot.reveal;
      context.fillStyle = '#092f35';
      context.fillRect(
        dot.x - step / 2,
        dot.y - step / 2,
        step + 0.5,
        step + 0.5,
      );
      const value = Math.round(100 + dot.shade * 125);
      context.fillStyle = `rgb(${Math.round(value * 0.8)},${value},${Math.round(value * 0.85)})`;
      context.beginPath();
      context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  };

  const render = (time: number) => {
    frame = 0;
    if (!visible || media.matches || !loaded) return;
    const delta = Math.min(time - (lastTime || time - 16), 40);
    lastTime = time;
    let unsettled = false;
    for (const dot of dots) {
      const distance = pointer
        ? Math.hypot(dot.x - pointer.x, dot.y - pointer.y)
        : Infinity;
      const proximity = Math.max(0, 1 - distance / Math.max(65, width * 0.27));
      const target = revealAll
        ? 1
        : proximity * proximity * (3 - 2 * proximity);
      const difference = target - dot.reveal;
      dot.reveal +=
        difference * (1 - Math.exp(-delta / (target > dot.reveal ? 110 : 240)));
      if (Math.abs(difference) > 0.003) unsettled = true;
      else dot.reveal = target;
    }
    paint();
    if (unsettled) frame = requestAnimationFrame(render);
  };
  const schedule = () => {
    if (!frame && visible && loaded && !media.matches) {
      lastTime = 0;
      frame = requestAnimationFrame(render);
    }
  };
  const setRevealAll = (value: boolean) => {
    revealAll = value;
    surface.setAttribute('aria-pressed', String(value));
    surface.setAttribute(
      'aria-label',
      `${value ? 'Hide' : 'Reveal'} photo of Dito`,
    );
    schedule();
  };

  const resize = () => {
    if (!loaded || media.matches) return;
    const rect = surface.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    width = rect.width;
    height = rect.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.ceil(width * ratio);
    canvas.height = Math.ceil(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const columns = Math.ceil(width / step),
      rows = Math.ceil(height / step);
    const sampling = document.createElement('canvas');
    sampling.width = columns;
    sampling.height = rows;
    const sampler = sampling.getContext('2d', { willReadFrequently: true });
    if (!sampler) return;
    const scale = Math.max(
      width / image.naturalWidth,
      height / image.naturalHeight,
    );
    const sw = width / scale,
      sh = height / scale;
    sampler.drawImage(
      image,
      (image.naturalWidth - sw) / 2,
      (image.naturalHeight - sh) * 0.35,
      sw,
      sh,
      0,
      0,
      columns,
      rows,
    );
    const pixels = sampler.getImageData(0, 0, columns, rows).data;
    dots = Array.from({ length: columns * rows }, (_, index) => {
      const i = index * 4;
      const shade =
        (pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722) /
        255;
      return {
        x: (index % columns) * step + step / 2,
        y: Math.floor(index / columns) * step + step / 2,
        shade,
        radius: (0.3 + shade * 0.65) * step * 0.46,
        reveal: revealAll ? 1 : 0,
      };
    });
    paint();
    root.dataset.ready = '';
    schedule();
  };

  surface.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType === 'touch' || media.matches) return;
      const rect = surface.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      schedule();
    },
    { signal: abort.signal },
  );
  surface.addEventListener(
    'pointerleave',
    () => {
      pointer = null;
      schedule();
    },
    { signal: abort.signal },
  );
  surface.addEventListener('click', () => setRevealAll(!revealAll), {
    signal: abort.signal,
  });
  surface.addEventListener(
    'blur',
    () => {
      pointer = null;
      setRevealAll(false);
    },
    { signal: abort.signal },
  );
  document.addEventListener(
    'pointerdown',
    (event) => {
      if (!root.contains(event.target as Node)) {
        pointer = null;
        setRevealAll(false);
      }
    },
    { signal: abort.signal },
  );

  const syncMotion = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    root.toggleAttribute('data-static', media.matches);
    surface.disabled = media.matches;
    if (media.matches) {
      root.removeAttribute('data-ready');
      surface.setAttribute('aria-label', 'Portrait of Dito');
    } else {
      setRevealAll(false);
      resize();
    }
  };
  media.addEventListener('change', syncMotion, { signal: abort.signal });
  const observer = new ResizeObserver(resize);
  observer.observe(surface);
  const visibility = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (!visible) {
      cancelAnimationFrame(frame);
      frame = 0;
      pointer = null;
      setRevealAll(false);
      dots.forEach((dot) => (dot.reveal = 0));
    } else schedule();
  });
  visibility.observe(surface);
  image
    .decode()
    .then(() => {
      if (!abort.signal.aborted) {
        loaded = true;
        syncMotion();
      }
    })
    .catch(() => root.setAttribute('data-static', ''));
  return () => {
    abort.abort();
    cancelAnimationFrame(frame);
    observer.disconnect();
    visibility.disconnect();
  };
}
