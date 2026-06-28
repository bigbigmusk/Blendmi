export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: "tiktok" | "instagram" | "youtube" | "pinterest";
};

// Update these URLs to the brand's real profiles.
export const socialLinks: SocialLink[] = [
  {
    label: "TikTok",
    handle: "@blendmi",
    href: "https://www.tiktok.com/@blendmi",
    icon: "tiktok",
  },
  {
    label: "Instagram",
    handle: "@blendmi",
    href: "https://www.instagram.com/blendmi",
    icon: "instagram",
  },
  {
    label: "YouTube",
    handle: "@blendmi",
    href: "https://www.youtube.com/@blendmi",
    icon: "youtube",
  },
  {
    label: "Pinterest",
    handle: "blendmi",
    href: "https://www.pinterest.com/blendmi",
    icon: "pinterest",
  },
];
