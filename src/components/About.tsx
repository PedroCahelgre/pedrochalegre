import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { VIDEOS, metrics } from "../data";
import { splitToChars } from "../lib/anim";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-black">
      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-14 md:px-10 md:py-40">
        <div className="about-copy">
          <span className="section-index">Capítulo 04 — Sobre</span>
          <h2 className="about-title about-split mt-4 font-display text-[clamp(2rem,6vw,6rem)] font-light leading-[0.9] tracking-[-0.03em] text-white sm:mt-5">
            Sobre Mim
          </h2>
          <div className="about-para mt-6 space-y-4 text-[16px] leading-[1.7] text-white/72 sm:mt-8 sm:space-y-5 sm:text-xl sm:leading-9 md:text-2xl md:leading-[1.55]">
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

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-14 sm:gap-x-8 sm:gap-y-10 md:grid-cols-3">
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
            ref={videoRef}
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
