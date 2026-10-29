import {
  IconGitHub,
  IconTwitter,
  IconTelegram,
  IconYouTube,
  IconReddit,
  IconDiscord,
  IconLinkedIn,
  IconUpwork,
  IconTrailblazer,
  IconSlack,
} from "@/components/social-svg-icons";

export interface SocialLink {
  key: string;
  label: string;
  url: string;
  Icon: React.ComponentType<{ className?: string }>;
}

/**
 * Env-driven contact channel registry.
 * A channel renders ONLY if its NEXT_PUBLIC_SOCIAL_* variable is non-empty,
 * so the founder fully controls which messengers/socials appear on the
 * landing (footer + "Not ready for the audit?" block) per deployment.
 */
export function getSocialLinks(): SocialLink[] {
  return [
    { key: "twitter", url: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "", label: "Twitter / X", Icon: IconTwitter },
    { key: "linkedin", url: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "", label: "LinkedIn", Icon: IconLinkedIn },
    { key: "slack", url: process.env.NEXT_PUBLIC_SOCIAL_SLACK || "", label: "Slack", Icon: IconSlack },
    { key: "telegram", url: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM || "", label: "Telegram", Icon: IconTelegram },
    { key: "upwork", url: process.env.NEXT_PUBLIC_SOCIAL_UPWORK || "", label: "Upwork", Icon: IconUpwork },
    { key: "trailblazer", url: process.env.NEXT_PUBLIC_SOCIAL_TRAILBLAZER || "", label: "Trailblazer", Icon: IconTrailblazer },
    { key: "github", url: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "", label: "GitHub", Icon: IconGitHub },
    { key: "youtube", url: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "", label: "YouTube", Icon: IconYouTube },
    { key: "reddit", url: process.env.NEXT_PUBLIC_SOCIAL_REDDIT || "", label: "Reddit", Icon: IconReddit },
    { key: "discord", url: process.env.NEXT_PUBLIC_SOCIAL_DISCORD || "", label: "Discord", Icon: IconDiscord },
  ].filter((item) => item.url.trim().length > 0);
}
