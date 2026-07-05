import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { VIDEOS, metrics } from "../data";
import { splitToChars } from "../lib/anim";

export function About() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const c = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-split").forEach(splitToChars);
      gsap.fromTo(
        ".about-title .char",
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          ease: "expo.out",
          scrollTrigger: { trigger: ".about-copy", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".about-para",
        { y: 30, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-copy", start: "top 76%" },
        },
      );

      // Parallax media
      gsap.fromTo(
        ".about-media",
        { yPercent: -8 },
        { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.fromTo(
        ".about-frame",
        { clipPath: "inset(14% 0% 14% 0% round 20px)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0% round 20px)",
          opacity: 1,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: ".about-frame", start: "top 85%" },
        },
      );

      gsap.utils.toArray<HTMLElement>(".metric").forEach((block, i) => {
        gsap.fromTo(
          block,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 90%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".metric-num").forEach((num) => {
        const value = Number(num.dataset.value ?? "0");
        const prefix = num.dataset.prefix ?? "";
        const suffix = num.dataset.suffix ?? "";
        const counter = { v: 0 };
        gsap.to(counter, {
          v: value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: num, start: "top 88%" },
          onUpdate: () => {
            num.textContent = `${prefix}${Math.round(counter.v)}${suffix}`;
          },
          onComplete: () => {
            num.textContent = `${prefix}${value}${suffix}`;
          },
        });
      });
    }, el);
    return () => c.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-black">
      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 py-28 md:grid-cols-[1fr_0.9fr] md:items-center md:px-10 md:py-40">
        <div className="about-copy">
          <span className="section-index">Capítulo 04 — Sobre</span>
          <h2 className="about-title about-split mt-5 font-display text-[clamp(2.6rem,6vw,6rem)] font-light leading-[0.9] tracking-[-0.03em] text-white">
            Sobre Mim
          </h2>
          <div className="about-para mt-8 space-y-5 text-xl leading-9 text-white/72 md:text-2xl md:leading-[1.55]">
            <p>
              Sou um Desenvolvedor Full Stack com 4 anos de experiência, com foco principal em desenvolvimento Frontend
              (70%) e sólidos conhecimentos em Backend (30%).
            </p>
            <p className="text-white/55">
              Especializado em criar interfaces modernas e responsivas, com atenção especial à experiência do usuário e
              performance. Baseado em Recife, PE, trabalho com as tecnologias mais modernas do mercado, sempre focando na
              qualidade do código e na experiência do usuário.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {metrics.map((m) => (
              <div className="metric" key={m.label}>
                {m.word ? (
                  <span className="metric-word">{m.word}</span>
                ) : (
                  <span
                    className="metric-num"
                    data-value={m.value}
                    data-prefix={m.prefix}
                    data-suffix={m.suffix}
                  >
                    {m.prefix}0{m.suffix}
                  </span>
                )}
                <span className="metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-frame">
          <video
            className="about-media"
            src={VIDEOS.about}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label="Retrato em vídeo de Pedro Chalegre"
          />
          <span className="about-frame__ring" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
