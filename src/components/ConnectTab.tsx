import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Server, Heart } from "lucide-react";
import GlassCard from "./GlassCard";
import SvgIcon from "./SvgIcon";
import type { ConnectSettings } from "../types";

interface ConnectTabProps {
  connect: ConnectSettings;
  onCopy: (message: string) => void;
}

export default function ConnectTab({ connect, onCopy }: ConnectTabProps) {
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);

  const handleCopyJava = () => {
    navigator.clipboard.writeText(connect.minecraftJavaIP);
    setCopiedJava(true);
    onCopy("Server IP copied!");
    setTimeout(() => setCopiedJava(false), 2000);
  };

  const handleCopyBedrock = () => {
    navigator.clipboard.writeText(`${connect.minecraftBedrockIP}:${connect.minecraftBedrockPort}`);
    setCopiedBedrock(true);
    onCopy("Bedrock IP copied!");
    setTimeout(() => setCopiedBedrock(false), 2000);
  };

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
              {connect.button1Label.replace(/^[^\s]+\s/, "")}
            </a>
            <a
              href={connect.button2Url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors px-4 py-2.5 text-sm font-semibold text-secondary"
            >
              <SvgIcon name={connect.button2Icon} className="h-4 w-4" />
              {connect.button2Label.replace(/^[^\s]+\s/, "")}
            </a>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard gradientBorder>
          <div className="flex items-center gap-3 mb-4">
            <Server className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-white">Minecraft Server</h3>
            <span
              className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                connect.minecraftOnline
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {connect.minecraftOnline ? "Online" : "Offline"}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Java IP</p>
                <p className="text-sm font-mono text-slate-200">{connect.minecraftJavaIP}</p>
              </div>
              <button
                onClick={handleCopyJava}
                className="rounded-lg bg-white/10 hover:bg-white/20 transition-colors p-2"
              >
                {copiedJava ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-400" />}
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Bedrock IP</p>
                <p className="text-sm font-mono text-slate-200">
                  {connect.minecraftBedrockIP}:{connect.minecraftBedrockPort}
                </p>
              </div>
              <button
                onClick={handleCopyBedrock}
                className="rounded-lg bg-white/10 hover:bg-white/20 transition-colors p-2"
              >
                {copiedBedrock ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-400" />}
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
