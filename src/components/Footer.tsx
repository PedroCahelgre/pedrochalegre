import { SOCIAL } from "../data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black px-5 pb-10 pt-16 sm:px-8 sm:pb-14 sm:pt-20 md:px-10 md:pb-16 md:pt-24">
      <div className="footer-line" aria-hidden="true" />

      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-10 sm:gap-16 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3 sm:space-y-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <img src="/logo.jpeg" alt="PC" className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10 sm:h-14 sm:w-14" />
              <div className="h-10 w-px bg-gradient-to-b from-blue-500/50 to-transparent sm:h-12" />
            </div>
            <h2 className="font-display text-[clamp(1.6rem,5vw,5rem)] font-light leading-[0.9] tracking-[-0.03em] text-white">
              Pedro Chalegre
            </h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-blue-400/70 sm:text-sm">Full Stack Developer</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.7)] sm:h-2.5 sm:w-2.5" />
              </span>
              <p className="text-[12px] text-white/50 sm:text-sm">Recife, PE - Brasil</p>
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:gap-10 md:items-end">
            <div className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-10 sm:gap-y-4">
              <a className="footer-link" href={SOCIAL.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="footer-link" href={SOCIAL.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="footer-link" href={SOCIAL.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="footer-link" href={SOCIAL.email}>
                E-mail
              </a>
            </div>

            <div className="flex flex-col items-end gap-2 text-right">
              <div className="flex items-center gap-2 text-[10px] text-white/30 sm:text-xs">
                <span>© 2026 Pedro Chalegre</span>
                <span className="h-px w-3 bg-white/20" />
                <span>Todos os direitos reservados</span>
              </div>
              <p className="max-w-xs text-right text-[10px] leading-relaxed text-white/20 sm:text-[11px]">
                Desenvolvido com paixão, código limpo e atenção aos mínimos detalhes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
