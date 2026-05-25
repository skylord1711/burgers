import { motion } from "framer-motion";

export default function Spinner() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-6">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-transparent border-t-primary border-r-secondary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-b-secondary border-l-pink-accent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.h1
        className="text-2xl font-extrabold tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-gradient">BurgerStreamHub</span>
      </motion.h1>
      <motion.p
        className="mt-2 text-sm text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Loading the grill...
      </motion.p>
    </motion.div>
  );
}
