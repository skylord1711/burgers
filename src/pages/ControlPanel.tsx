import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Power,
  Target,
  Gamepad2,
  Palette,
  Save,
  Trash2,
  BarChart3,
  Globe,
  MessageCircle,
  LogOut,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import ToastContainer from "../components/Toast";
import { ADMIN_CREDENTIALS } from "../constants";
import { useToast } from "../hooks/useToast";
import { saveAuth } from "../store";
import type { SiteSettings } from "../types";

interface ControlPanelProps {
  settings: SiteSettings;
  updateSettings: (patch: Partial<SiteSettings>) => void;
  updateSocialPlatform: (id: string, patch: Record<string, unknown>) => void;
  resetStats: () => void;
  onLogout: () => void;
}

export default function ControlPanel({
  settings,
  updateSettings,
  updateSocialPlatform,
  resetStats,
  onLogout,
}: ControlPanelProps) {
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();
  const [authenticated, setAuthenticated] = useState(() => {
    const stored = localStorage.getItem("burgerstream_auth");
    return stored === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [followerGoalInput, setFollowerGoalInput] = useState(String(settings.followerGoal));
  const [localPrimary, setLocalPrimary] = useState(settings.primaryColor);
  const [localSecondary, setLocalSecondary] = useState(settings.secondaryColor);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setAuthenticated(true);
      saveAuth(true);
      setLoginError("");
      addToast("Welcome back, Burger King! 👑", "success");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    saveAuth(false);
    onLogout();
    navigate("/");
  };

  const handleSaveGoal = () => {
    const val = parseInt(followerGoalInput, 10);
    if (!isNaN(val) && val > 0) {
      updateSettings({ followerGoal: val });
      addToast("Follower goal updated!", "success");
    }
  };

  const handleSaveColors = () => {
    updateSettings({ primaryColor: localPrimary, secondaryColor: localSecondary });
    addToast("Theme colors updated!", "success");
  };

  const handleToggleLive = () => {
    updateSettings({ isLive: !settings.isLive });
    addToast(settings.isLive ? "Stream set to Offline" : "Stream set to Live!", settings.isLive ? "error" : "success");
  };

  const handleResetStats = () => {
    resetStats();
    addToast("Click stats reset!", "success");
  };

  if (!authenticated) {
    return (
      <div className="relative z-10 mx-auto max-w-sm min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
          <button
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to site
          </button>

          <GlassCard gradientBorder glow="primary">
            <h2 className="text-xl font-extrabold text-white mb-1">
              <span className="text-gradient">Admin Login</span>
            </h2>
            <p className="text-sm text-slate-400 mb-6">Enter your credentials to manage the stream hub.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-2.5 text-sm font-bold text-white hover:opacity-90 transition-all"
              >
                Sign In
              </button>
            </form>
          </GlassCard>
        </motion.div>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto max-w-lg min-h-screen pb-16">
      <div className="sticky top-0 z-20 glass border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Control Panel</span>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-4">
        <h1 className="text-xl font-extrabold">
          <span className="text-gradient">Stream Control</span>
        </h1>

        {/* Live/Offline Toggle */}
        <GlassCard gradientBorder glow="primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Power className={`h-5 w-5 ${settings.isLive ? "text-red-400" : "text-slate-500"}`} />
              <div>
                <p className="font-bold text-white text-sm">Stream Status</p>
                <p className="text-xs text-slate-400">{settings.isLive ? "You are LIVE!" : "Offline"}</p>
              </div>
            </div>
            <button
              onClick={handleToggleLive}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                settings.isLive ? "bg-red-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform shadow-md ${
                  settings.isLive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-white text-sm">Follower Goal</h3>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={followerGoalInput}
              onChange={(e) => setFollowerGoalInput(e.target.value)}
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSaveGoal}
              className="rounded-xl bg-primary/20 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/30 transition-colors"
            >
              Save
            </button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="h-5 w-5 text-secondary" />
            <h3 className="font-bold text-white text-sm">Main Game</h3>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={settings.mainGame}
              onChange={(e) => {
                const v = e.target.value;
                updateSettings({ mainGame: v });
              }}
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </GlassCard>

        {/* Color Theme Customizer */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-5 w-5 text-pink-accent" />
            <h3 className="font-bold text-white text-sm">Theme Colors</h3>
          </div>
          <div className="flex gap-6 mb-4">
            <div>
              <label className="block text-xs text-slate-400 mb-2">Primary</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={localPrimary}
                  onChange={(e) => setLocalPrimary(e.target.value)}
                  className="h-10 w-10"
                />
                <input
                  type="text"
                  value={localPrimary}
                  onChange={(e) => setLocalPrimary(e.target.value)}
                  className="w-24 rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2">Secondary</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={localSecondary}
                  onChange={(e) => setLocalSecondary(e.target.value)}
                  className="h-10 w-10"
                />
                <input
                  type="text"
                  value={localSecondary}
                  onChange={(e) => setLocalSecondary(e.target.value)}
                  className="w-24 rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSaveColors}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            <Save className="h-4 w-4" /> Save Colors
          </button>
        </GlassCard>

        {/* Social Links Editor */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-white text-sm">Social Links</h3>
          </div>
          <div className="space-y-4">
            {settings.socialPlatforms.map((platform) => (
              <div key={platform.id} className="rounded-xl bg-white/5 p-3 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{platform.name}</p>
                <input
                  type="text"
                  placeholder="Username"
                  value={platform.username}
                  onChange={(e) => updateSocialPlatform(platform.id, { username: e.target.value })}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={platform.url}
                  onChange={(e) => updateSocialPlatform(platform.id, { url: e.target.value })}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={platform.description}
                  onChange={(e) => updateSocialPlatform(platform.id, { description: e.target.value })}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs text-slate-400">
                    <input
                      type="checkbox"
                      checked={platform.isLive || false}
                      onChange={(e) => updateSocialPlatform(platform.id, { isLive: e.target.checked })}
                      className="rounded bg-white/10 border-white/20"
                    />
                    LIVE
                  </label>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Connect Settings Editor */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="h-5 w-5 text-secondary" />
            <h3 className="font-bold text-white text-sm">Connect Settings</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Welcome Text</label>
              <textarea
                value={settings.connect.welcomeText}
                onChange={(e) =>
                  updateSettings({ connect: { ...settings.connect, welcomeText: e.target.value } })
                }
                rows={3}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Button 1 Label</label>
                <input
                  type="text"
                  value={settings.connect.button1Label}
                  onChange={(e) =>
                    updateSettings({ connect: { ...settings.connect, button1Label: e.target.value } })
                  }
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Button 1 URL</label>
                <input
                  type="text"
                  value={settings.connect.button1Url}
                  onChange={(e) =>
                    updateSettings({ connect: { ...settings.connect, button1Url: e.target.value } })
                  }
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Button 2 Label</label>
                <input
                  type="text"
                  value={settings.connect.button2Label}
                  onChange={(e) =>
                    updateSettings({ connect: { ...settings.connect, button2Label: e.target.value } })
                  }
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Button 2 URL</label>
                <input
                  type="text"
                  value={settings.connect.button2Url}
                  onChange={(e) =>
                    updateSettings({ connect: { ...settings.connect, button2Url: e.target.value } })
                  }
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Support Text</label>
              <textarea
                value={settings.connect.supportText}
                onChange={(e) =>
                  updateSettings({ connect: { ...settings.connect, supportText: e.target.value } })
                }
                rows={2}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
              />
            </div>
          </div>
        </GlassCard>

        {/* Click Analytics */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-white text-sm">Click Analytics</h3>
            </div>
            <button
              onClick={handleResetStats}
              className="flex items-center gap-1 rounded-lg bg-red-500/10 px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="h-3 w-3" /> Reset
            </button>
          </div>
          <div className="space-y-2">
            {settings.socialPlatforms.map((platform) => {
              const clicks = settings.clickStats[platform.id] || 0;
              const maxClicks = Math.max(
                1,
                ...settings.socialPlatforms.map((p) => settings.clickStats[p.id] || 0)
              );
              const barWidth = (clicks / maxClicks) * 100;

              return (
                <div key={platform.id} className="flex items-center gap-3">
                  <span className="w-20 text-xs font-semibold text-slate-300 shrink-0">{platform.name}</span>
                  <div className="flex-1 h-5 rounded-lg bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-lg bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <span className="w-10 text-right text-xs font-mono text-slate-400">{clicks}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[10px] text-slate-500 text-center">Click counts reset on page load</p>
        </GlassCard>

        <div className="text-center pb-8">
          <p className="text-[10px] text-slate-600">
            All settings are saved automatically to localStorage
          </p>
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
