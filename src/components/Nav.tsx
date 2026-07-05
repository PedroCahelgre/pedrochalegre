import { useEffect, useState } from "react";

const links = [
  { href: "#expertise", label: "Especialidades" },
  { href: "#projects", label: "Projetos" },
  { href: "#about", label: "Sobre" },
  { href: "#contact", label: "Contato" },
];

export function Nav() {
  const [state, setState] = useState<"hero" | "transition" | "scrolled">("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setState("hero");
      } else if (y < window.innerHeight * 0.6) {
        setState("transition");
      } else {
        setState("scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const cls =
    state === "hero"
      ? "nav-shell"
      : state === "transition"
        ? "nav-shell"
        : "nav-shell is-scrolled";

  return (
    <header className={cls}>
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-8 sm:py-4 md:px-10">
        <a href="#hero" className="nav-brand" onClick={() => setMenuOpen(false)}>
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/logo.jpeg" alt="PC" className="h-8 w-8 rounded object-cover sm:h-10 sm:w-10" />
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[-0.01em] sm:text-lg">Pedro Chalegre</span>
              <span className="nav-brand__role">Full Stack Developer</span>
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="relative z-[60] flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span className="sr-only">{menuOpen ? "Fechar" : "Menu"}</span>
          <span className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
            <span
              className={`h-[1.5px] w-5 bg-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                menuOpen ? "translate-y-[3.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                menuOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                menuOpen ? "-translate-y-[3.25px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-50 flex flex-col bg-[#0a0a0a] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <a href="#hero" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <img src="/logo.jpeg" alt="PC" className="h-8 w-8 rounded object-cover" />
            <span className="font-display text-sm tracking-[-0.01em]">Pedro Chalegre</span>
          </a>
        </div>

        <div className="flex flex-1 flex-col justify-center px-8">
          <nav className="flex flex-col gap-1">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex items-baseline gap-4 py-3"
                style={{
                  transitionDelay: menuOpen ? `${80 + i * 50}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.35s",
                  transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-[10px] font-mono text-white/20 tabular-nums">
                  0{i + 1}
                </span>
                <span className="font-display text-2xl font-extralight tracking-[-0.02em] text-white/70 transition-colors duration-300 group-hover:text-white">
                  {l.label}
                </span>
              </a>
            ))}
          </nav>

          <div
            style={{
              transitionDelay: menuOpen ? `${80 + links.length * 50}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transitionProperty: "opacity",
              transitionDuration: "0.35s",
              transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
            }}
            className="my-8 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent"
          />

          <a
            href="#contact"
            className="self-start rounded-full border border-white/15 bg-white/5 px-7 py-2.5 text-xs uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            style={{
              transitionDelay: menuOpen ? `${80 + (links.length + 1) * 50}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(10px)",
              transitionProperty: "opacity, transform, border-color, background, color",
              transitionDuration: "0.35s",
              transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Fale Comigo
          </a>
        </div>
      </div>
    </header>
  );
}
