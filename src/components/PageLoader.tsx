import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function PageLoader() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const barRef    = useRef<HTMLDivElement>(null);
  const numRef    = useRef<HTMLSpanElement>(null);
  const awRef     = useRef<HTMLDivElement>(null);
  const tagRef    = useRef<HTMLParagraphElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!wrapRef.current || !barRef.current || !numRef.current || !awRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setGone(true); return; }

    const tl  = gsap.timeline({ onComplete: () => setGone(true) });
    const obj = { val: 0 };

    tl
      .fromTo(awRef.current,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .fromTo(tagRef.current, { opacity: 0 },        { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .to(obj, {
        val: 100, duration: 1.6, ease: 'power2.inOut',
        onUpdate() {
          const v = Math.round(obj.val);
          if (numRef.current) numRef.current.textContent = String(v).padStart(2, '0');
          if (barRef.current)  barRef.current.style.transform = `scaleX(${obj.val / 100})`;
        },
      }, '-=0.05')
      .to(wrapRef.current, { yPercent: -100, duration: 1.0, ease: 'power4.inOut' }, '+=0.15');

    return () => { tl.kill(); };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#020207',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2rem',
      }}
    >
      <div
        ref={awRef}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          opacity: 0,
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono,monospace)', color: '#C9A227', fontSize: '2.25rem', fontWeight: 700, letterSpacing: '0.15em' }}>
          AW
        </div>
        <p
          ref={tagRef}
          style={{ fontFamily: 'var(--font-mono,monospace)', fontSize: '0.65rem', color: '#56546E', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0 }}
        >
          Amin Wafi · Portfolio
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '200px' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div
            ref={barRef}
            style={{ height: '100%', background: '#C9A227', transformOrigin: 'left center', transform: 'scaleX(0)' }}
          />
        </div>
        <span
          ref={numRef}
          style={{ fontFamily: 'var(--font-mono,monospace)', fontSize: '0.7rem', color: '#56546E', minWidth: '1.75rem', textAlign: 'right' }}
        >
          00
        </span>
      </div>
    </div>
  );
}
