import { useState, useEffect, createContext, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import type { SiteSettings, ToastMessage, ToastType } from "../types";
import { TAB_NAMES } from "../constants";
import Spinner from "../components/Spinner";
import AnimatedBackground from "../components/AnimatedBackground";
import CursorGlow from "../components/CursorGlow";
import ProfileHeader from "../components/ProfileHeader";
import StatsBar from "../components/StatsBar";
import TabNavigation from "../components/TabNavigation";
import LinksTab from "../components/LinksTab";
import ScheduleTab from "../components/ScheduleTab";
import ConnectTab from "../components/ConnectTab";
import ToastContainer from "../components/Toast";

interface SettingsContextType {
  settings: SiteSettings;
  trackClick: (id: string) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: {} as SiteSettings,
  trackClick: () => {},
});

export function useSettingsContext() {
  return useContext(SettingsContext);
}

interface HomePageProps {
  settings: SiteSettings;
  trackClick: (id: string) => void;
  addToast: (message: string, type?: ToastType) => void;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function HomePage({
  settings,
  trackClick,
  addToast,
  toasts,
  removeToast,
}: HomePageProps) {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<(typeof TAB_NAMES)[number]>("Links");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (message: string) => {
    addToast(message, "success");
  };

  return (
    <SettingsContext.Provider value={{ settings, trackClick }}>
      <AnimatePresence>{loading && <Spinner />}</AnimatePresence>

      <div className={`relative z-10 mx-auto max-w-lg min-h-screen transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
        <ProfileHeader isLive={settings.isLive} />
        <StatsBar followerGoal={settings.followerGoal} mainGame={settings.mainGame} />
        <TabNavigation tabs={TAB_NAMES} activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as typeof activeTab)} />

        <AnimatePresence mode="wait">
          {activeTab === "Links" && <LinksTab key="links" platforms={settings.socialPlatforms} onTrack={trackClick} />}
          {activeTab === "Schedule" && <ScheduleTab key="schedule" schedule={settings.schedule} />}
          {activeTab === "Connect" && <ConnectTab key="connect" connect={settings.connect} onCopy={handleCopy} />}
        </AnimatePresence>
      </div>

      <AnimatedBackground primaryColor={settings.primaryColor} secondaryColor={settings.secondaryColor} />
      <CursorGlow primaryColor={settings.primaryColor} />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </SettingsContext.Provider>
  );
}
