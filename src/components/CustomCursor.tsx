import { useEffect, useRef } from 'react';

const TRAIL = 6;

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    const trail = trailRef.current;

    dot.style.display  = 'block';
    ring.style.display = 'block';
    trail.forEach((t) => { if (t) t.style.display = 'block'; });
    document.documentElement.classList.add('custom-cursor');

    // Store trail positions
    const trailPos = Array.from({ length: TRAIL }, () => ({ x: 0, y: 0 }));
    let mx = 0, my = 0, rx = 0, ry = 0;
    let hovering = false, clicking = false;
    let animId: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e: MouseEvent) => {
      hovering = !!(e.target as HTMLElement).closest('a,button,[role="button"],summary,label');
    };
    const onOut  = () => { hovering = false; };
    const onDown = () => { clicking = true; };
    const onUp   = () => { clicking = false; };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    const tick = () => {
      animId = requestAnimationFrame(tick);

      // Dot — exact
      dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`;

      // Ring — lerp
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      const s = clicking ? 0.7 : hovering ? 1.9 : 1.0;
      ring.style.transform = `translate(${rx - 18}px,${ry - 18}px) scale(${s})`;
      ring.style.borderColor = hovering ? 'var(--accent)' : 'color-mix(in srgb, var(--fg) 20%, transparent)';
      ring.style.opacity = hovering ? '1' : '0.45';
      dot.style.opacity = hovering ? '0' : '1';

      // Trail segments — each lags progressively more
      trailPos[0] = { x: rx, y: ry };
      for (let i = 1; i < TRAIL; i++) {
        trailPos[i] = {
          x: trailPos[i].x + (trailPos[i - 1].x - trailPos[i].x) * 0.35,
          y: trailPos[i].y + (trailPos[i - 1].y - trailPos[i].y) * 0.35,
        };
        const el = trail[i];
        if (!el) continue;
        const ratio = 1 - i / TRAIL;
        const sz    = 3 + ratio * 5;
        el.style.transform = `translate(${trailPos[i].x - sz / 2}px,${trailPos[i].y - sz / 2}px)`;
        el.style.width   = `${sz}px`;
        el.style.height  = `${sz}px`;
        el.style.opacity = String(ratio * 0.3);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    display: 'none', position: 'fixed',
    pointerEvents: 'none', zIndex: 99999, top: 0, left: 0,
    willChange: 'transform',
  };

  return (
    <>
      {/* Main dot */}
      <div ref={dotRef} aria-hidden="true"
        style={{ ...baseStyle, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}
      />
      {/* Ring */}
      <div ref={ringRef} aria-hidden="true"
        style={{
          ...baseStyle,
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid color-mix(in srgb, var(--fg) 20%, transparent)',
          zIndex: 99998,
          transition: 'border-color 0.2s, opacity 0.2s, transform 0.06s linear',
        }}
      />
      {/* Trail */}
      {Array.from({ length: TRAIL }, (_, i) => (
        <div key={i} ref={(el) => { if (el) trailRef.current[i] = el; }} aria-hidden="true"
          style={{
            ...baseStyle,
            borderRadius: '50%', background: 'var(--accent)',
            zIndex: 99997 - i,
            transition: 'width 0.1s, height 0.1s',
          }}
        />
      ))}
    </>
  );
}
