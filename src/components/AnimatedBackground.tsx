import { useEffect, useRef } from "react";
import { hexToRgb } from "../utils";

interface Orb {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  radius: number;
}

export default function AnimatedBackground({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const pRgb = hexToRgb(primaryColor);
    const sRgb = hexToRgb(secondaryColor);

    orbsRef.current = [
      { x: centerX, y: centerY, size: 400, color: `rgba(${pRgb.r},${pRgb.g},${pRgb.b},0.15)`, angle: 0, speed: 0.003, radius: 250 },
      { x: centerX, y: centerY, size: 350, color: `rgba(${sRgb.r},${sRgb.g},${sRgb.b},0.15)`, angle: 2.1, speed: 0.004, radius: 200 },
      { x: centerX, y: centerY, size: 300, color: "rgba(236,72,153,0.12)", angle: 4.2, speed: 0.005, radius: 280 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const orb of orbsRef.current) {
        orb.angle += orb.speed;
        const ox = cx + Math.cos(orb.angle) * orb.radius;
        const oy = cy + Math.sin(orb.angle) * orb.radius;

        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(0.5, orb.color.replace("0.15", "0.08").replace("0.12", "0.05"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [primaryColor, secondaryColor]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
