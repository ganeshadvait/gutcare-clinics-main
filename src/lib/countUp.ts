/** Animates numbers in elements matching `selector` (with a numeric `data-count`) from 0 when they scroll into view. */
export function countUp(selector: string, duration = 1600) {
  const els = document.querySelectorAll<HTMLElement>(selector);
  if (!els.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const format = (n: number) => Math.round(n).toLocaleString('en-IN');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.count);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = format(target * (1 - Math.pow(1 - t, 3)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 },
  );
  els.forEach((el) => {
    el.textContent = '0';
    observer.observe(el);
  });
}
