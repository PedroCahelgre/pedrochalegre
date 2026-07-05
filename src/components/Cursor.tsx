import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("a, button, [data-cursor]");
      gsap.to(ring, {
        scale: t ? 2.4 : 1,
        borderColor: t ? "rgba(59,130,246,0.9)" : "rgba(255,255,255,0.35)",
        backgroundColor: t ? "rgba(59,130,246,0.08)" : "transparent",
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
