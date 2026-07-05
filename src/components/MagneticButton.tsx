import type { ReactNode } from "react";
import { magnetMove, magnetReset } from "../lib/anim";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function MagneticButton({ href, children, variant = "ghost", external, className = "" }: Props) {
  return (
    <a
      href={href}
      className={`magnetic ${variant} ${className}`}
      onPointerMove={(e) => magnetMove(e)}
      onPointerLeave={magnetReset}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="magnetic__label">{children}</span>
      <span className="magnetic__glow" aria-hidden="true" />
    </a>
  );
}
