import { DEFAULT_SETTINGS, STORAGE_KEYS } from "./constants";
import type { SiteSettings } from "./types";

export function loadSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch {}
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  } catch {}
}

export function loadAuth(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.auth) === "true";
  } catch {
    return false;
  }
}

export function saveAuth(value: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.auth, value ? "true" : "");
  } catch {}
}
