import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll to top immediately on page load (before React mounts)
if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function useSmoothScroll() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Desativa Lenis em dispositivos touch / telas pequenas para economizar CPU e bateria
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (isTouch) return;

    const isLowEnd =
      (navigator as unknown as { deviceMemory?: number }).deviceMemory !== undefined &&
      (navigator as unknown as { deviceMemory: number }).deviceMemory <= 4;
    // Em dispositivos com pouca memória, usa duração menor
    const duration = isLowEnd ? 0.9 : 1.25;

    const lenis = new Lenis({
      duration,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.4,
      gestureOrientation: "vertical",
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links routed through Lenis for buttery navigation.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
