import type { CSSProperties, PointerEvent } from "react";
import gsap from "gsap";

export const EASE = "power3.out";
export const EASE_CINEMA = "expo.out";

/** Splits an element's text into word + char spans for staggered reveals. */
export function splitToChars(element: HTMLElement) {
  if (element.dataset.split === "true") return;
  const text = element.textContent ?? "";
  element.setAttribute("aria-label", text);
  element.dataset.split = "true";

  const words = text.split(/(\s+)/);
  element.textContent = "";

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      element.appendChild(document.createTextNode(" "));
      continue;
    }
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";
    for (const ch of Array.from(word)) {
      const charSpan = document.createElement("span");
      charSpan.className = "char";
      charSpan.setAttribute("aria-hidden", "true");
      charSpan.textContent = ch;
      wordSpan.appendChild(charSpan);
    }
    element.appendChild(wordSpan);
  }
}

export function tiltMove(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  gsap.to(el, {
    "--rx": `${-y * 7}deg`,
    "--ry": `${x * 9}deg`,
    "--mx": `${(x + 0.5) * 100}%`,
    "--my": `${(y + 0.5) * 100}%`,
    duration: 0.5,
    ease: "power2.out",
    overwrite: "auto",
  });
}

export function tiltReset(event: PointerEvent<HTMLElement>) {
  gsap.to(event.currentTarget, {
    "--rx": "0deg",
    "--ry": "0deg",
    "--mx": "50%",
    "--my": "50%",
    duration: 0.7,
    ease: "power3.out",
    overwrite: "auto",
  });
}

/** Magnetic pull for interactive elements. */
export function magnetMove(event: PointerEvent<HTMLElement>, strength = 0.32) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left - rect.width / 2) * strength;
  const y = (event.clientY - rect.top - rect.height / 2) * strength;
  gsap.to(el, { x, y, duration: 0.5, ease: "power3.out", overwrite: "auto" });
}

export function magnetReset(event: PointerEvent<HTMLElement>) {
  gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
}

export type ParticleStyle = CSSProperties & Record<string, string>;
