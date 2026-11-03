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
  IconInstagram,
} from "@/components/social-svg-icons";
import { getActiveProjectConfig } from "@/lib/project-config";

export interface SocialLink {
  key: string;
  label: string;
  url: string;
  Icon: React.ComponentType<{ className?: string }>;
  /** true when the channel is fit for two-way conversation (DMs/questions), not just a profile link */
  contactable: boolean;
}

/**
 * Env-driven contact channel registry with multi-brand isolation (FR-011).
 * - A channel renders ONLY if its URL is non-empty.
 * - Brand-specific config.social takes precedence; global NEXT_PUBLIC_SOCIAL_*
 *   fallback applies only to the default underundre brand to maintain brand isolation.
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
  const config = getActiveProjectConfig();
  const isDefaultBrand = config.slug === "underundre" || config.slug === "undreseller";

  const getUrl = (key: string, envVal?: string) => {
    if (config.social?.[key] !== undefined) return config.social[key];
    if (isDefaultBrand && envVal) return envVal;
    return "";
  };

  return [
    { key: "twitter", url: getUrl("twitter", process.env.NEXT_PUBLIC_SOCIAL_TWITTER), label: "Twitter / X", Icon: IconTwitter },
    { key: "instagram", url: getUrl("instagram", process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM), label: "Instagram", Icon: IconInstagram },
    { key: "linkedin", url: getUrl("linkedin", process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN), label: "LinkedIn", Icon: IconLinkedIn },
    { key: "slack", url: getUrl("slack", process.env.NEXT_PUBLIC_SOCIAL_SLACK), label: "Slack", Icon: IconSlack },
    { key: "telegram", url: getUrl("telegram", process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM), label: "Telegram", Icon: IconTelegram },
    { key: "upwork", url: getUrl("upwork", process.env.NEXT_PUBLIC_SOCIAL_UPWORK), label: "Upwork", Icon: IconUpwork },
    { key: "trailblazer", url: getUrl("trailblazer", process.env.NEXT_PUBLIC_SOCIAL_TRAILBLAZER), label: "Trailblazer", Icon: IconTrailblazer },
    { key: "github", url: getUrl("github", process.env.NEXT_PUBLIC_SOCIAL_GITHUB), label: "GitHub", Icon: IconGitHub },
    { key: "youtube", url: getUrl("youtube", process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE), label: "YouTube", Icon: IconYouTube },
    { key: "reddit", url: getUrl("reddit", process.env.NEXT_PUBLIC_SOCIAL_REDDIT), label: "Reddit", Icon: IconReddit },
    { key: "discord", url: getUrl("discord", process.env.NEXT_PUBLIC_SOCIAL_DISCORD), label: "Discord", Icon: IconDiscord },
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
