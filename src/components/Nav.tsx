import { useEffect, useState } from "react";

const links = [
  { href: "#expertise", label: "Especialidades" },
  { href: "#projects", label: "Projetos" },
  { href: "#about", label: "Sobre" },
  { href: "#contact", label: "Contato" },
];

export function Nav() {
  const [state, setState] = useState<"hero" | "transition" | "scrolled">("hero");

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

  const cls =
    state === "hero"
      ? "nav-shell nav-shell--hero"
      : state === "transition"
        ? "nav-shell nav-shell--mid"
        : "nav-shell is-scrolled";

  return (
    <header className={cls}>
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#hero" className="nav-brand">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="PC" className="h-10 w-10 rounded object-cover" />
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-[-0.01em]">Pedro Chalegre</span>
              <span className="nav-brand__role">Full Stack Developer</span>
            </div>
          </div>
        </a>
        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="nav-cta md:hidden">
          Contato
        </a>
      </nav>
    </header>
  );
}
