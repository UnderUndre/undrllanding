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
  /** true when the channel is fit for two-way conversation (DMs/questions), not just a profile link */
  contactable: boolean;
}

/**
 * Env-driven contact channel registry.
 * - A channel renders ONLY if its NEXT_PUBLIC_SOCIAL_* variable is non-empty
 *   (footer "Socials" + any block that lists channels).
 * - NEXT_PUBLIC_CONTACT_CHANNELS is a comma-separated allowlist of keys that
 *   are fit for direct conversation ("Not ready for the audit?" block and the
 *   Thank-You fallback). Keys not listed stay as plain profile links in the
 *   footer but never appear as "write me here" CTAs.
 *   If the variable is unset or empty, every configured channel is treated
 *   as contactable (sane zero-config default).
 */
function parseContactAllowlist(): string[] | null {
  const raw = process.env.NEXT_PUBLIC_CONTACT_CHANNELS;
  if (!raw || !raw.trim()) return null;
  return raw
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);
}

export function getSocialLinks(): SocialLink[] {
  const allowlist = parseContactAllowlist();

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
  ]
    .filter((item) => item.url.trim().length > 0)
    .map((item) => ({
      ...item,
      contactable: allowlist === null ? true : allowlist.includes(item.key),
    }));
}

/** Channels fit for "write me here" CTAs: configured AND marked contactable. */
export function getContactChannels(): SocialLink[] {
  return getSocialLinks().filter((link) => link.contactable);
}
