import { useEffect, useState, useRef } from "react";
import type { ParticleStyle } from "../lib/anim";

const allParticles = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 17) % 100}%`,
  duration: `${8 + (i % 7)}s`,
  delay: `${-1 * (i % 9)}s`,
  scale: `${0.6 + (i % 4) * 0.2}`,
}));

export function Particles({ fixed = true }: { fixed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(30);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(0);
      return;
    }
    setCount(isMobile ? 12 : 22);

    if (!ref.current || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  if (count === 0) return null;

  const particles = allParticles.slice(0, count);

  return (
    <div
      ref={ref}
      className={fixed ? "particle-field is-fixed" : "particle-field"}
      aria-hidden="true"
      style={!visible ? { display: "none" } : undefined}
    >
      {particles.map((p, i) => (
        <span
          key={`${p.left}-${p.top}`}
          className={i % 4 === 0 ? "is-bright" : ""}
          style={
            {
              "--left": p.left,
              "--top": p.top,
              "--duration": p.duration,
              "--delay": p.delay,
              "--scale": p.scale,
            } as ParticleStyle
          }
        />
      ))}
    </div>
  );
}
