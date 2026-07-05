import type { ParticleStyle } from "../lib/anim";

const particles = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 17) % 100}%`,
  duration: `${8 + (i % 7)}s`,
  delay: `${-1 * (i % 9)}s`,
  scale: `${0.6 + (i % 4) * 0.2}`,
}));

export function Particles({ fixed = true }: { fixed?: boolean }) {
  return (
    <div className={fixed ? "particle-field is-fixed" : "particle-field"} aria-hidden="true">
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
