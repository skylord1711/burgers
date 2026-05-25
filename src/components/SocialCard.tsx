import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import GlassCard from "./GlassCard";
import SvgIcon from "./SvgIcon";
import type { SocialPlatform } from "../types";

interface SocialCardProps {
  platform: SocialPlatform;
  index: number;
  onTrack: (id: string) => void;
}

export default function SocialCard({ platform, index, onTrack }: SocialCardProps) {
  const handleClick = () => {
    onTrack(platform.id);
    window.open(platform.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
    >
      <GlassCard gradientBorder glow="primary" onClick={handleClick}>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <SvgIcon name={platform.icon} className="h-6 w-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white truncate">{platform.name}</h3>
              {platform.isLive && (
                <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-wider">
                  LIVE
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400 truncate">{platform.username}</p>
            <p className="text-xs text-slate-500 truncate mt-0.5">{platform.description}</p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <ExternalLink className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
