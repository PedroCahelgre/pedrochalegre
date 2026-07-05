import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VIDEOS } from "../data";
import { splitToChars } from "../lib/anim";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    video.muted = true;
    video.setAttribute("playsinline", "");
    video.preload = "metadata";
    video.loop = false;
    video.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;will-change:transform;transform:translateZ(0);";

    // ── Scrub video on scroll ──
    let duration = 0;
    let lastSeek = 0;
    let targetTime = 0;
    let ticking = false;

    function applySeek(now: number) {
      ticking = false;
      if (now - lastSeek < 80) return;
      if (Math.abs(video.currentTime - targetTime) > 0.05) {
        video.currentTime = targetTime;
        lastSeek = now;
      }
    }

    function onScroll() {
      if (!duration) return;
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      targetTime = p * duration;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applySeek);
      }
    }

    async function onDuration() {
      duration = video.duration || 1;
      video.currentTime = 0;
      try { await video.play(); } catch (_) {}
      video.pause();
      onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    if (video.readyState >= 1) {
      onDuration();
    } else {
      video.addEventListener("loadedmetadata", onDuration, { once: true });
    }

    // ── Content animations ──
    gsap.utils.toArray<HTMLElement>(".hero-split").forEach(splitToChars);

    const intro = gsap.timeline();
    intro
      .fromTo(".hero-badge", { y: 20, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.25 })
      .fromTo(".hero-title .char", { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.028, ease: "expo.out" }, "-=0.7")
      .fromTo(".hero-fade", { y: 34, opacity: 0, filter: "blur(12px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12, ease: "power3.out" }, "-=0.6")
      .fromTo(".hero-scroll-cue", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.3");

    const exit = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 },
    });
    exit
      .to(".hero-scroll-cue", { opacity: 0, duration: 0.1 }, 0)
      .to(".hero-copy-block", { y: -70, opacity: 0, filter: "blur(14px)", ease: "power2.in", duration: 0.3 }, 0.05)
      .to(".hero-wash", { opacity: 0.55, ease: "power2.inOut", duration: 0.3 }, 0.1);

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", onDuration);
      intro.kill();
      exit.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[420vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
        <video ref={videoRef} src={VIDEOS.hero} muted playsInline preload="metadata" className="hero-video" />
        <div className="chapter-grade" aria-hidden="true" />
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-0" aria-hidden="true" />

        <div className="hero-copy-block absolute inset-x-0 bottom-[9vh] z-10 mx-auto max-w-[1400px] px-5 sm:px-6 md:bottom-[11vh] md:px-10">
          <span className="hero-badge chip">
            <span className="chip__dot" /> Full Stack Developer
          </span>

          <h1 className="hero-title hero-split mt-5 font-display text-[clamp(2.4rem,11vw,14rem)] font-light leading-[0.82] tracking-[-0.03em] text-white sm:mt-7">
            Pedro Chalegre
          </h1>

          <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <h2 className="hero-fade max-w-2xl font-display text-[clamp(1.2rem,3.4vw,3.2rem)] font-light italic leading-[1.02] tracking-[-0.02em] text-white/92">
              Transformando ideias em experiências digitais de alta performance.
            </h2>
            <div className="hero-fade space-y-5 sm:space-y-6 md:pb-2">
              <p className="max-w-md text-[14px] leading-6 text-white/60 sm:text-[15px] sm:leading-7">
                Desenvolvedor Full Stack especializado na criação de aplicações modernas, interfaces sofisticadas e
                experiências digitais que unem performance, design e inovação.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <MagneticButton href="#projects" variant="primary">
                  Ver Projetos
                </MagneticButton>
                <MagneticButton href="#contact">Entrar em Contato</MagneticButton>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-cue pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/45">Rolar</span>
          <span className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
