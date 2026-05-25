import type { SiteSettings } from "./types";

export const DEFAULT_SETTINGS: SiteSettings = {
  isLive: false,
  mainGame: "Minecraft",
  primaryColor: "#3b82f6",
  secondaryColor: "#a855f7",
  socialPlatforms: [
    {
      id: "tiktok",
      name: "TikTok",
      icon: "tiktok",
      username: "@burger_frosty",
      url: "https://tiktok.com/@burger_frosty",
      description: "Short clips & funny moments",
      isLive: false,
    },
    {
      id: "discord",
      name: "Discord",
      icon: "discord",
      username: "BurgerFrosty",
      url: "https://discord.gg/burgerfrosty",
      description: "Join the community!",
      isLive: false,
    },
  ],
  schedule: [
    { day: "Monday", time: "9:45PM EST", emoji: "🍔" },
    { day: "Tuesday", time: "9:45PM EST", emoji: "🍟" },
    { day: "Wednesday", time: null, emoji: "😴" },
    { day: "Thursday", time: "9:45PM EST", emoji: "🍔" },
    { day: "Friday", time: "9:45PM EST", emoji: "🔥" },
    { day: "Saturday", time: "9:45PM EST", emoji: "🎮" },
    { day: "Sunday", time: null, emoji: "😴" },
  ],
  connect: {
    welcomeText:
      "Welcome to the Burger Stream! I'm Frosty — a burger-obsessed streamer playing games, making content, and building the tastiest community on the internet. Grab a seat, grab a burger, and let's hang out!",

    supportText:
      "Love what I do? Consider supporting the stream! Your support helps me get better equipment, more games, and of course — more burgers.",
    button1Label: "📺 Watch Live",
    button1Icon: "twitch",
    button1Url: "https://twitch.tv/burgerfrosty",
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
