export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: "tiktok" | "instagram" | "youtube" | "pinterest";
};

// Instagram is the brand's confirmed, official profile.
// TikTok / YouTube use the same @blendmibeauty handle as sensible defaults —
// update the URLs here once those accounts are confirmed.
export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    handle: "@blendmibeauty",
    href: "https://www.instagram.com/blendmibeauty",
    icon: "instagram",
  },
  {
    label: "TikTok",
    handle: "@blendmibeauty",
    href: "https://www.tiktok.com/@blendmibeauty",
    icon: "tiktok",
  },
  {
    label: "YouTube",
    handle: "@blendmibeauty",
    href: "https://www.youtube.com/@blendmibeauty",
    icon: "youtube",
  },
];
