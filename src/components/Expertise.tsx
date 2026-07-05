import { VIDEOS, skillGroups } from "../data";

export function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover opacity-70"
          src={VIDEOS.expertise}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr] md:items-center">
          {/* ── Left: text ── */}
          <header>
            <span className="section-index">Capítulo 02</span>
            <h2 className="mt-4 font-display text-[clamp(4rem,8vw,8.5rem)] font-light leading-[0.85] tracking-[-0.03em] text-white">
              Especialidades
            </h2>
            <p className="mt-8 max-w-sm text-base leading-8 text-white/55">
              Tecnologias utilizadas para construir aplicações modernas, escaláveis e de alta performance.
            </p>
          </header>

          {/* ── Right: cards ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              <article
                key={group.title}
                className={`glass-card ${i === 0 ? "sm:col-span-2" : ""}`}
              >
                <div className="glass-card__inner">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-lg font-normal tracking-[-0.01em] text-white">
                      {group.title}
                    </h3>
                    <span className="font-mono text-[11px] text-blue-400/70">{group.index}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="skill-token">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
