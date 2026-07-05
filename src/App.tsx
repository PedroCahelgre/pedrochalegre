import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Particles } from "./components/Particles";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Expertise } from "./components/Expertise";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";

export default function App() {
  useSmoothScroll();
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const st = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.4 },
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      st.scrollTrigger?.kill();
      st.kill();
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white antialiased">
      <div ref={progressRef} className="scroll-progress" />
      <Particles />
      <Nav />
      <main>
        <Hero />
        <Expertise />
        <Projects />
        <About />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
