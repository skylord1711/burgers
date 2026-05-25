import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import GlassCard from "./GlassCard";
import SvgIcon from "./SvgIcon";
import type { ConnectSettings } from "../types";

interface ConnectTabProps {
  connect: ConnectSettings;
}

export default function ConnectTab({ connect }: ConnectTabProps) {
  return (
    <div className="px-4 pb-8 space-y-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard gradientBorder>
          <h3 className="text-lg font-bold text-white mb-2">Welcome!</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{connect.welcomeText}</p>

          <div className="mt-4 flex gap-3">
            <a
              href={connect.button1Url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-primary/20 hover:bg-primary/30 transition-colors px-4 py-2.5 text-sm font-semibold text-primary"
            >
              <SvgIcon name={connect.button1Icon} className="h-4 w-4" />
              <span className="truncate">{connect.button1Label}</span>
            </a>
            <a
              href={connect.button2Url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors px-4 py-2.5 text-sm font-semibold text-secondary"
            >
              <SvgIcon name={connect.button2Icon} className="h-4 w-4" />
              <span className="truncate">{connect.button2Label}</span>
            </a>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard>
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-pink-accent" />
            <div>
              <h3 className="font-bold text-white">Support</h3>
              <p className="text-sm text-slate-400">{connect.supportText}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
