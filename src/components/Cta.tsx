import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { VIDEOS, SOCIAL } from "../data";
import { splitToChars } from "../lib/anim";
import { MagneticButton } from "./MagneticButton";
import { Particles } from "./Particles";

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const video = videoRef.current;
    if (!el) return;

    const c = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cta-split").forEach(splitToChars);

      gsap.fromTo(
        ".cta-title .char",
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.02,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 60%" },
        },
      );
      gsap.fromTo(
        ".cta-fade",
        { y: 34, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 52%" },
        },
      );
    }, el);

    // "Smile moment": near the end of the loop, intensify the blue glow + particles.
    let smiling = false;
    const onTime = () => {
      if (!video || !video.duration) return;
      const p = video.currentTime / video.duration;
      const isSmile = p > 0.66;
      if (isSmile !== smiling) {
        smiling = isSmile;
        gsap.to(".cta-glow", { opacity: isSmile ? 1 : 0.25, scale: isSmile ? 1.12 : 1, duration: 1.2, ease: "power2.out" });
        gsap.to(".cta-particles", { opacity: isSmile ? 1 : 0, duration: 1.2, ease: "power2.out" });
        gsap.to(".cta-actions .magnetic", {
          borderColor: isSmile ? "rgba(59,130,246,0.7)" : "rgba(255,255,255,0.16)",
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
        });
      }
    };
    video?.addEventListener("timeupdate", onTime);

    return () => {
      c.revert();
      video?.removeEventListener("timeupdate", onTime);
    };
  }, []);

  return (
    <section ref={ref} id="contact" className="relative min-h-[100svh] overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center opacity-90 max-md:object-contain"
          src={VIDEOS.cta}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40" />
      </div>

      <div className="cta-glow pointer-events-none absolute inset-0 z-[1] opacity-25" aria-hidden="true" />
      <div className="cta-particles pointer-events-none absolute inset-0 z-[2] opacity-0">
        <Particles fixed={false} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 py-32 md:px-10">
        <span className="section-index">Capítulo 05 — Vamos Construir</span>
        <h2 className="cta-title cta-split mt-6 max-w-5xl font-display text-[clamp(2.8rem,8vw,8.5rem)] font-light leading-[0.9] tracking-[-0.03em] text-white">
          Vamos construir o seu próximo projeto.
        </h2>
        <p className="cta-fade mt-8 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
          Estou disponível para desenvolver aplicações modernas, landing pages premium, sistemas completos e
          experiências digitais de alto impacto.
        </p>
        <div className="cta-actions cta-fade mt-10 flex flex-col gap-3 sm:flex-row">
          <MagneticButton href={SOCIAL.whatsapp} external variant="primary">
            WhatsApp
          </MagneticButton>
          <MagneticButton href={SOCIAL.email} variant="primary">
            E-mail
          </MagneticButton>
          <MagneticButton href={SOCIAL.github} external>
            GitHub
          </MagneticButton>
          <MagneticButton href={SOCIAL.linkedin} external>
            LinkedIn
          </MagneticButton>
          <MagneticButton href={SOCIAL.instagram} external>
            Instagram
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
