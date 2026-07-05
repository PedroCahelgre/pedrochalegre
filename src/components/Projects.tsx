import { projects } from "../data";

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.12),transparent_40%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="section-index">Capítulo 03 — Projetos Selecionados</span>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,7vw,7rem)] font-light leading-[0.9] tracking-[-0.03em] text-white">
              Projetos com presença e precisão.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-white/50">
            Uma seleção de produtos onde engenharia e design caminham juntos.
          </p>
        </header>

        <div className="space-y-8 md:space-y-12">
          {projects.map((project, i) => (
            <article
              key={project.name}
              className={`project-card ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="project-media">
                <img
                  src={project.image}
                  alt={`Preview do projeto ${project.name}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>

              <div className="project-body">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-blue-400/70">
                  <span>{project.number} / Projeto</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.6rem)] font-normal leading-[0.95] tracking-[-0.02em] text-white">
                  {project.name}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-white/62">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[12px] text-white/45">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex gap-3">
                  <a href={project.live} target="_blank" rel="noreferrer" className="proj-btn">
                    Ver Projeto <span aria-hidden="true">↗</span>
                  </a>
                  <a href={project.github} target="_blank" rel="noreferrer" className="proj-btn ghost">
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
