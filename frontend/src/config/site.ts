const SITE_URL_FALLBACK = "https://www.thedevbox.org";

export const SITE_URL = SITE_URL_FALLBACK;
export const SITE_NAME = "thedevbox";
export const SITE_DISPLAY_NAME = "thedevbox";
export const SITE_LOGO_TEXT = "[thedevbox]";
export const SITE_ALTERNATE_NAMES = ["devbox", "[devbox]"] as const;
export const SITE_TITLE = "thedevbox - tools that don't suck";
export const SITE_DESCRIPTION =
  "Fast, private, ad-free developer tools that run in your browser.";
export const SITE_OG_IMAGE = "/opengraph-image";
export const SITE_LOCALE = "en_US";
export const SITE_KEYWORDS = [
  "developer tools",
  "web tools",
  "browser utilities",
  "online developer tools",
  "privacy first developer tools",
  "local browser tools",
  "json formatter",
  "base64 decoder",
  "hash generator",
  "jwt decoder",
  "regex tester",
  "timestamp converter",
  "thedevbox",
  "devbox",
] as const;

export function getSiteOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_FALLBACK;

  try {
    return new URL(raw).origin;
  } catch {
    return new URL(SITE_URL_FALLBACK).origin;
  }
}

export function getSiteStructuredData() {
  const siteOrigin = getSiteOrigin();

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
      url: siteOrigin,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
      url: siteOrigin,
      description: SITE_DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Runs in modern browsers.",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "JSON formatter",
        "Base64 encoder and decoder",
        "JWT decoder",
        "Hash generator",
        "Regex tester",
        "Timestamp converter",
        "Markdown preview",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
      url: siteOrigin,
      sameAs: [OSS_LINKS.repo],
    },
  ];
}

export const OSS_LINKS = {
  repo: "https://github.com/PhilixTheExplorer/thedevbox",
  contribute: "https://github.com/PhilixTheExplorer/thedevbox/pulls",
  issues: "https://github.com/PhilixTheExplorer/thedevbox/issues",
  sponsors: "https://github.com/sponsors/PhilixTheExplorer",
} as const;

export type OssSupportId = "star" | "sponsor" | "contribute";

export type OssSupportLink = {
  id: OssSupportId;
  label: string;
  href: string;
  title: string;
};

export const OSS_SUPPORT_LINKS: readonly OssSupportLink[] = [
  {
    id: "star",
    label: "star repo",
    href: OSS_LINKS.repo,
    title: "star this project on GitHub",
  },
  {
    id: "sponsor",
    label: "sponsor",
    href: OSS_LINKS.sponsors,
    title: "become a sponsor",
  },
  {
    id: "contribute",
    label: "contribute",
    href: OSS_LINKS.contribute,
    title: "open pull requests and contribute code",
  },
];
