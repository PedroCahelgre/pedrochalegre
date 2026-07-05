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

  // Lock body scroll when menu is open
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

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile: hamburger button */}
        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span className="sr-only">{menuOpen ? "Fechar" : "Menu"}</span>
          <span
            className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-3xl font-light tracking-[-0.02em] text-white/80 transition-colors hover:text-white"
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transitionProperty: "opacity, transform, color",
                transitionDuration: "0.3s",
                transitionTimingFunction: "ease",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 rounded-full border border-blue-500/50 bg-blue-500/10 px-8 py-3 text-sm uppercase tracking-[0.2em] text-blue-400 transition-all hover:bg-blue-500/20"
            style={{
              transitionDelay: menuOpen ? `${links.length * 80}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transitionProperty: "opacity, transform, background",
              transitionDuration: "0.3s",
              transitionTimingFunction: "ease",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}
