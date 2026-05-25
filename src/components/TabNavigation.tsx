import { motion } from "framer-motion";

interface TabNavigationProps {
  tabs: readonly string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export type { TabNavigationProps };

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="relative mx-4 mb-6 flex rounded-2xl glass p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative z-10 flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors duration-300 ${
            activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {tab}
        </button>
      ))}
      <motion.div
        className="absolute top-1 bottom-1 rounded-xl bg-primary/20"
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          left: `${(tabs.indexOf(activeTab) / tabs.length) * 100}%`,
          width: `${100 / tabs.length}%`,
        }}
      />
    </div>
  );
}
