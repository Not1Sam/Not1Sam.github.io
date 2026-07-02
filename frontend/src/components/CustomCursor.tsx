import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const check = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isHover: boolean =
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        !!t.closest("a") ||
        !!t.closest("button") ||
        t.classList.contains("bento-box");
      setHover(isHover);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", check);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", check);
    };
  }, []);

  return (
    <>
      <div
        className="fixed w-[6px] h-[6px] bg-fluo rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={`fixed w-[30px] h-[30px] border border-fluo rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          hover ? "w-[50px] h-[50px] bg-fluo/10" : ""
        }`}
        style={{
          left: pos.x,
          top: pos.y,
          transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      />
    </>
  );
}
