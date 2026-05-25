import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  gradientBorder?: boolean;
  glow?: "primary" | "secondary" | "none";
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  gradientBorder = false,
  glow = "none",
  onClick,
}: GlassCardProps) {
  const glowClass = glow === "primary" ? "glow-primary" : glow === "secondary" ? "glow-secondary" : "";
  const borderClass = gradientBorder ? "gradient-border" : "";

  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl p-4 transition-all duration-300 ${borderClass} ${glowClass} ${
        onClick ? "cursor-pointer hover:scale-[1.02]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
