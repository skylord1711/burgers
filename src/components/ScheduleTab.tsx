import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import type { ScheduleDay } from "../types";

interface ScheduleTabProps {
  schedule: ScheduleDay[];
}

function getToday(): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date().getDay()];
}

export default function ScheduleTab({ schedule }: ScheduleTabProps) {
  const today = getToday();

  return (
    <div className="px-4 pb-8">
      <GlassCard gradientBorder>
        <h3 className="text-lg font-bold text-white mb-4">Weekly Schedule</h3>
        <div className="space-y-1.5">
          {schedule.map((day, i) => {
            const isToday = day.day === today;
            const isOff = day.time === null;

            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                  isToday ? "bg-primary/15 ring-1 ring-primary/30" : "hover:bg-white/5"
                }`}
              >
                <span className="text-lg w-8 text-center shrink-0">{day.emoji}</span>
                <span
                  className={`w-24 text-sm font-semibold ${
                    isToday ? "text-primary" : isOff ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {day.day}
                </span>
                <span
                  className={`flex-1 text-sm text-right ${
                    isOff
                      ? "text-slate-600 line-through"
                      : isToday
                        ? "text-white font-semibold"
                        : "text-slate-400"
                  }`}
                >
                  {isOff ? "OFF" : day.time}
                </span>
                {isToday && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/20 rounded-full px-2 py-0.5">
                    Today
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-slate-500 text-center">All times are in EST</p>
      </GlassCard>
    </div>
  );
}
