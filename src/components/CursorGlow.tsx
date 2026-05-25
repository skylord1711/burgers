import { useEffect, useRef } from "react";

export default function CursorGlow({ primaryColor }: { primaryColor: string }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const isTouchRef = useRef(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    isTouchRef.current = isTouch;
    if (isTouch) return;

    const handleMouse = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
      }
    };

    const handleLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const handleEnter = () => {
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouse);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  if (isTouchRef.current) return null;

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle, ${primaryColor}22 0%, transparent 70%)`,
        transform: "translate(-100px, -100px)",
      }}
    />
  );
}
