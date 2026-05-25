export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  username: string;
  url: string;
  description: string;
  isLive?: boolean;
}

export interface ScheduleDay {
  day: string;
  time: string | null;
  emoji: string;
}

export interface ConnectSettings {
  welcomeText: string;

  supportText: string;
  button1Label: string;
  button1Icon: string;
  button1Url: string;
  button2Label: string;
  button2Icon: string;
  button2Url: string;
}

export interface SiteSettings {
  isLive: boolean;
  mainGame: string;
  primaryColor: string;
  secondaryColor: string;
  socialPlatforms: SocialPlatform[];
  schedule: ScheduleDay[];
  connect: ConnectSettings;
  clickStats: Record<string, number>;
}

export type ToastType = "success" | "error";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}
