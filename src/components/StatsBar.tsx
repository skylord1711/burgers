import { motion } from "framer-motion";
import { Target, Gamepad2 } from "lucide-react";
import GlassCard from "./GlassCard";
import { formatCount } from "../utils";

interface StatsBarProps {
  followerGoal: number;
  mainGame: string;
}

export default function StatsBar({ followerGoal, mainGame }: StatsBarProps) {
  return (
    <div className="flex gap-3 px-4 mb-6">
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard glow="primary">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/20 p-2.5">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Follower Goal</p>
              <p className="text-lg font-bold text-white">{formatCount(followerGoal)}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard glow="secondary">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-secondary/20 p-2.5">
              <Gamepad2 className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Main Game</p>
              <p className="text-lg font-bold text-white">{mainGame}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
