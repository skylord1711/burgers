import type { SocialPlatform } from "../types";
import SocialCard from "./SocialCard";

interface LinksTabProps {
  platforms: SocialPlatform[];
  onTrack: (id: string) => void;
}

export default function LinksTab({ platforms, onTrack }: LinksTabProps) {
  return (
    <div className="px-4 pb-8 space-y-3">
      {platforms.map((platform, i) => (
        <SocialCard key={platform.id} platform={platform} index={i} onTrack={onTrack} />
      ))}
    </div>
  );
}
