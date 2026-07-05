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
    video.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;will-change:transform;transform:translateZ(0);";

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
      try {
        await video.play();
      } catch (_) {}
      video.pause();
      onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    if (video.readyState >= 1) {
      onDuration();
    } else {
      video.addEventListener("loadedmetadata", onDuration, { once: true });
    }

    // ── Split text to chars for animation ──
    gsap.utils.toArray<HTMLElement>(".hero-split").forEach(splitToChars);

    // Refresh ScrollTrigger on resize / orientation change
    const refreshTrigger = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refreshTrigger);
    window.addEventListener("orientationchange", refreshTrigger);

    // ── gsap.matchMedia for mobile vs desktop ──
    const mm = gsap.matchMedia();

    // MOBILE
    mm.add("(max-width: 767px)", () => {
      // Lighter intro animations
      const introMobile = gsap.timeline();
      introMobile
        .fromTo(
          ".hero-badge",
          { y: 14, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out", delay: 0.2 }
        )
        .fromTo(
          ".hero-title .char",
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.02, ease: "expo.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-fade",
          { y: 24, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-scroll-cue",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        );

      // Reposition video focus for mobile
      video.style.objectPosition = "65% center";

      return () => {
        introMobile.kill();
      };
    });

    // DESKTOP
    mm.add("(min-width: 768px)", () => {
      const introDesktop = gsap.timeline();
      introDesktop
        .fromTo(
          ".hero-badge",
          { y: 20, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.25 }
        )
        .fromTo(
          ".hero-title .char",
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.028, ease: "expo.out" },
          "-=0.7"
        )
        .fromTo(
          ".hero-fade",
          { y: 34, opacity: 0, filter: "blur(12px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-scroll-cue",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.3"
        );

      video.style.objectPosition = "center center";

      return () => {
        introDesktop.kill();
      };
    });

    // Exit animation (same for all)
    const exit = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    exit
      .to(".hero-scroll-cue", { opacity: 0, duration: 0.1 }, 0)
      .to(
        ".hero-copy-block",
        { y: -70, opacity: 0, filter: "blur(14px)", ease: "power2.in", duration: 0.3 },
        0.05
      )
      .to(".hero-wash", { opacity: 0.55, ease: "power2.inOut", duration: 0.3 }, 0.1);

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", onDuration);
      window.removeEventListener("resize", refreshTrigger);
      window.removeEventListener("orientationchange", refreshTrigger);
      mm.revert();
      exit.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[250vh] sm:h-[300vh] lg:h-[420vh]"
    >
      <div
        className="sticky top-0 h-[100svh] overflow-hidden bg-black"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <video
          ref={videoRef}
          src={VIDEOS.hero}
          muted
          playsInline
          preload="metadata"
          className="hero-video"
        />
        <div className="chapter-grade" aria-hidden="true" />
        <div
          className="hero-wash pointer-events-none absolute inset-0 opacity-0"
          aria-hidden="true"
        />

        <div className="hero-copy-block absolute inset-x-0 bottom-10 z-10 mx-auto max-w-screen-xl px-6 sm:bottom-14 sm:px-8 lg:bottom-[10vh] lg:px-12">
          <span className="hero-badge chip">
            <span className="chip__dot" /> Full Stack Developer
          </span>

          <h1 className="hero-title hero-split mt-5 font-display text-5xl font-light leading-[0.85] tracking-[-0.03em] text-white sm:text-6xl sm:mt-7 md:text-7xl lg:text-[9rem] xl:text-[12rem]">
            Pedro Chalegre
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h2 className="hero-fade max-w-full font-display text-[clamp(1.1rem,3.2vw,3.2rem)] font-light italic leading-[1.05] tracking-[-0.02em] text-white/92 lg:max-w-2xl">
              Transformando ideias em experiências digitais de alta performance.
            </h2>
            <div className="hero-fade space-y-5 sm:space-y-6 lg:pb-2">
              <p className="max-w-full text-[15px] leading-7 text-white/60 lg:max-w-md">
                Desenvolvedor Full Stack especializado na criação de aplicações
                modernas, interfaces sofisticadas e experiências digitais que
                unem performance, design e inovação.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <MagneticButton href="#projects" variant="primary" className="w-full sm:w-auto">
                  Ver Projetos
                </MagneticButton>
                <MagneticButton href="#contact" className="w-full sm:w-auto">
                  Entrar em Contato
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-cue pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-6">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/45 sm:text-[10px]">
            Rolar
          </span>
          <span className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
