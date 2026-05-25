import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import LiveIndicator from "./LiveIndicator";

const AVATAR_URL =
  "https://media.discordapp.net/attachments/1396167988645986336/1507919498026418246/7202478318171112491_thumbnail.webp?ex=6a14f878&is=6a13a6f8&hm=1c41cf6d67f494d75bbff43e8b1580ca05821ee4722e9f12faf07b7b1973244d&=&format=webp&width=3168&height=1782";

interface ProfileHeaderProps {
  isLive: boolean;
}

export default function ProfileHeader({ isLive }: ProfileHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center pt-8 pb-4">
      <button
        onClick={() => navigate("/control")}
        className="absolute top-4 right-4 z-10 rounded-xl glass p-2 text-slate-400 hover:text-white transition-all hover:scale-110"
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      <div className="relative mb-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-primary via-secondary to-pink-accent p-0.5">
          <img
            src={AVATAR_URL}
            alt="Burger Streamer Avatar"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        {isLive && <LiveIndicator />}
      </div>

      <motion.h1
        className="text-2xl font-extrabold tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-gradient">BurgerStreamHub</span>
      </motion.h1>

      <motion.p
        className="mt-1 text-sm text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Burger streamer &amp; content creator
      </motion.p>
    </div>
  );
}
