import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const check = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isHover = t.tagName === "A" || t.tagName === "BUTTON" || !!t.closest("a") || !!t.closest("button") || t.classList.contains("bento-box");
      if (isHover !== hovering.current) {
        hovering.current = isHover;
        ring.style.width = isHover ? "44px" : "26px";
        ring.style.height = isHover ? "44px" : "26px";
        ring.style.borderColor = isHover ? "var(--color-fluo)" : "var(--color-fluo)";
        ring.style.boxShadow = isHover ? "0 0 12px var(--color-fluo-dim)" : "none";
      }
    };

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      ring.style.left = `${pos.current.x}px`;
      ring.style.top = `${pos.current.y}px`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", check);
    raf = requestAnimationFrame(animate);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseover", check); cancelAnimationFrame(raf); };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <div ref={dotRef} className="fixed w-1.5 h-1.5 bg-fluo rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_var(--color-fluo-glow)]" />
      <div ref={ringRef} className="fixed w-[26px] h-[26px] border border-fluo/50 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,box-shadow] duration-300" style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" }} />
    </>
  );
}
