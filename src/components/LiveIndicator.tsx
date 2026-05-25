import { motion } from "framer-motion";

export default function LiveIndicator() {
  return (
    <div className="absolute -inset-1.5 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #3b82f6, #a855f7, #ec4899, #3b82f6)",
          animation: "pulse-ring 2s ease-in-out infinite",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 rounded-full bg-dark-bg" />
      <motion.div
        className="absolute -top-1 right-0 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LIVE
      </motion.div>
    </div>
  );
}
