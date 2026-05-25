import type { SiteSettings } from "./types";

export const SETTINGS_VERSION = 7;

export const DEFAULT_SETTINGS: SiteSettings = {
  _version: SETTINGS_VERSION,
  isLive: false,
  followerGoal: 15000,
  mainGame: "Minecraft",
  primaryColor: "#3b82f6",
  secondaryColor: "#a855f7",
  socialPlatforms: [
    {
      id: "tiktok",
      name: "TikTok",
      icon: "tiktok",
      username: "@amburg3rs",
      url: "https://www.tiktok.com/@amburg3rs",
      description: "Short clips & funny moments",
      isLive: false,
    },
    {
      id: "discord",
      name: "Discord",
      icon: "discord",
      username: "BurgerFrosty",
      url: "https://discord.com/invite/EJMQ4Rhn2v",
      description: "Join the community!",
      isLive: false,
    },
    {
      id: "linktree",
      name: "Linktree",
      icon: "linktree",
      username: "Amburg3rss",
      url: "https://linktr.ee/Amburg3rss",
      description: "All my links in one place",
      isLive: false,
    },
  ],
  schedule: [
    { day: "Monday", time: "9:45PM EST", emoji: "🍔" },
    { day: "Tuesday", time: "9:45PM EST", emoji: "🍔" },
    { day: "Wednesday", time: null, emoji: "😴" },
    { day: "Thursday", time: "9:45PM EST", emoji: "🍔" },
    { day: "Friday", time: "9:45PM EST", emoji: "🍔" },
    { day: "Saturday", time: "9:45PM EST", emoji: "🍔" },
    { day: "Sunday", time: null, emoji: "😴" },
  ],
  connect: {
    welcomeText:
      "Welcome to the Burger Stream! I'm Frosty — a burger-obsessed streamer playing games, making content, and building the tastiest community on the internet. Grab a seat, grab a burger, and let's hang out!",

    supportText:
      "Love what I do? Consider supporting the stream! Your support helps me get better equipment, more games, and of course — more burgers.",
    button1Label: "🎵 Follow on TikTok",
    button1Icon: "tiktok",
    button1Url: "https://www.tiktok.com/@amburg3rs",
    button2Label: "💬 Join Discord",
    button2Icon: "discord",
    button2Url: "https://discord.gg/burgerfrosty",
  },
  clickStats: {},
};

export const ADMIN_CREDENTIALS = {
  username: "burger",
  password: "frostyisthegoat123",
};

export const STORAGE_KEYS = {
  settings: "burgerstream_settings",
  auth: "burgerstream_auth",
};

export const TAB_NAMES = ["Links", "Schedule", "Connect"] as const;
