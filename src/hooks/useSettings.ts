import { useState, useCallback, useEffect } from "react";
import type { SiteSettings } from "../types";
import { loadSettings, saveSettings } from "../store";

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(loadSettings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSettings = useCallback((patch: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateSocialPlatform = useCallback(
    (id: string, patch: Record<string, unknown>) => {
      setSettings((prev) => ({
        ...prev,
        socialPlatforms: prev.socialPlatforms.map((p) =>
          p.id === id ? { ...p, ...patch } : p
        ),
      }));
    },
    []
  );

  const trackClick = useCallback((platformId: string) => {
    setSettings((prev) => ({
      ...prev,
      clickStats: {
        ...prev.clickStats,
        [platformId]: (prev.clickStats[platformId] || 0) + 1,
      },
    }));
  }, []);

  const resetStats = useCallback(() => {
    setSettings((prev) => ({ ...prev, clickStats: {} }));
  }, []);

  return { settings, updateSettings, updateSocialPlatform, trackClick, resetStats };
}
