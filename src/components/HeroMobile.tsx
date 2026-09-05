import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { VIDEOS } from "../data";
import { splitToChars } from "../lib/anim";
import { MagneticButton } from "./MagneticButton";

export function HeroMobile() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute("playsinline", "");
    video.preload = "auto";
    video.loop = true;
    video.play().catch(() => {});

    // Split text
    gsap.utils.toArray<HTMLElement>(".hero-split").forEach(splitToChars);

    // Simple fade-in animation
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-badge",
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2 }
    )
      .fromTo(
        ".hero-title .char",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "expo.out" },
        "-=0.4"
      )
      .fromTo(
        ".hero-fade",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ".hero-scroll-cue",
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      );

    return () => {
      tl.kill();
      video.pause();
    };
  }, []);

  return (
    <section id="hero" className="relative h-[100svh] overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={VIDEOS.hero}
        muted
        playsInline
        preload="auto"
        autoPlay
        loop
        className="absolute inset-0 h-full w-full object-cover object-[center_5%]"
      />
      <div className="chapter-grade" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 top-[50%] z-10 mx-auto flex flex-col items-center justify-end pb-14 px-5 text-center">
        <span className="hero-badge chip">
          <span className="chip__dot" /> Full Stack Developer
        </span>

        <h1 className="hero-title hero-split mt-2 font-display text-[clamp(2rem,8vw,9rem)] font-light leading-[0.85] tracking-[-0.03em] text-white">
          Pedro Chalegre
        </h1>

        <h2 className="hero-fade mt-2 max-w-[90%] font-display text-[clamp(0.85rem,3.5vw,2rem)] font-light italic leading-[1.1] tracking-[-0.02em] text-white/92">
          Transformando ideias em experiências digitais de alta performance.
        </h2>

        <p className="hero-fade mt-2 max-w-[90%] text-[12px] leading-[1.3] text-white/60">
          Desenvolvedor Full Stack especializado na criação de aplicações
          modernas, interfaces sofisticadas e experiências digitais que
          unem performance, design e inovação.
        </p>

        <div className="hero-fade mt-3 flex w-full flex-col gap-2">
          <MagneticButton href="#projects" variant="primary" className="w-full">
            Ver Projetos
          </MagneticButton>
          <MagneticButton href="#contact" className="w-full">
            Entrar em Contato
          </MagneticButton>
        </div>
      </div>

      <div className="hero-scroll-cue pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/45">Rolar</span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}
