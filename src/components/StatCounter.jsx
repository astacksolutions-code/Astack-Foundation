import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function StatCounter({ value, label, suffix = '+' }) {
  const ref = useReveal(0.4);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, ref]);

  return (
    <div ref={ref} className="reveal text-center">
      <div className="font-mono text-4xl md:text-5xl font-bold text-white tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-accent/80 text-sm mt-2 tracking-wide">{label}</div>
    </div>
  );
}
