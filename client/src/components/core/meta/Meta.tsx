import type { JSX } from 'react';

/**
 * Props for Meta component defining various head and link tags.
 */
type MetaProps = {
  /** Apple mobile web app capable flag */
  appleMobileWebAppCapable?: string;
  /** Apple touch icon URL */
  appleTouchIcon?: string;
  /** Author of the document */
  author?: string;
  /** Canonical URL */
  canonical?: string;
  /** Character encoding */
  charset?: string;
  /** HTTP-Equiv: Content-Language */
  contentLanguage?: string;
  /** Meta description */
  description?: string;
  /** Google site verification token */
  googleSiteVerification?: string;
  /** SEO keywords */
  keywords?: string;
  /** PWA manifest URL */
  manifest?: string;
  /** Mobile web app capable flag */
  mobileWebAppCapable?: string;
  /** Microsoft tile color */
  msTileColor?: string;
  /** Microsoft tile image URL */
  msTileImage?: string;
  /** Twitter/Facebook creator handle (e.g. @username) */
  name?: string;
  /** OpenGraph image URL */
  ogImage?: string;
  /** OpenGraph locale (e.g., "en_US") */
  ogLocale?: string;
  /** OpenGraph URL */
  ogUrl?: string;
  /** HTTP-Equiv: refresh content (seconds) */
  refresh?: string;
  /** Search engine instructions (e.g., "index,follow") */
  robots?: string;
  /** OpenGraph site name */
  siteName?: string;
  /** Theme color for mobile browsers */
  themeColor?: string;
  /** Page title */
  title?: string;
  /** Twitter image alt text */
  twitterImageAlt?: string;
  /** Twitter site handle (e.g., @site) */
  twitterSite?: string;
  /** OpenGraph/Twitter card type */
  type?: 'article' | 'book' | 'profile' | 'website';
  /** Viewport settings (e.g., "width=device-width, initial-scale=1") */
  viewport?: string;
  /** HTTP-Equiv: X-UA-Compatible */
  xUaCompatible?: string;
  /** Yandex site verification token */
  yandexVerification?: string;
};

/**
 * Configuration for a single meta/link tag or group of tags
 */
type TagConfig = {
  /** Function that builds the tag(s) from the prop value */
  builder: (value: string) => JSX.Element | JSX.Element[];
  /** Property key in MetaProps */
  key: keyof MetaProps;
};

/**
 * Generic tag builder for meta tags
 */
const createMetaTag = (
  key: string,
  name: string,
  content: string,
): JSX.Element => (
  <meta
    key={key}
    name={name}
    content={content}
  />
);

/**
 * Generic tag builder for property-based meta tags (OpenGraph)
 */
const createPropertyTag = (
  key: string,
  property: string,
  content: string,
): JSX.Element => (
  <meta
    key={key}
    property={property}
    content={content}
  />
);

/**
 * Generic tag builder for link tags
 */
const createLinkTag = (key: string, rel: string, href: string): JSX.Element => (
  <link
    key={key}
    rel={rel}
    href={href}
  />
);

/**
 * Generic tag builder for http-equiv meta tags
 */
const createHttpEquivTag = (
  key: string,
  httpEquiv: string,
  content: string,
): JSX.Element => (
  <meta
    key={key}
    httpEquiv={httpEquiv}
    content={content}
  />
);

/**
 * Tag configurations mapping prop names to their builder functions
 */
const tagConfigs: TagConfig[] = [
  {
    builder: (value: string) => (
      <meta
        key="charset"
        charSet={value}
      />
    ),
    key: 'charset',
  },
  {
    builder: (value: string) => createMetaTag('viewport', 'viewport', value),
    key: 'viewport',
  },
  {
    builder: (value: string) => [
      <title key="title">{value}</title>,
      createPropertyTag('og:title', 'og:title', value),
      createMetaTag('twitter:title', 'twitter:title', value),
    ],
    key: 'title',
  },
  {
    builder: (value: string) => [
      createMetaTag('description', 'description', value),
      createPropertyTag('og:description', 'og:description', value),
      createMetaTag('twitter:description', 'twitter:description', value),
    ],
    key: 'description',
  },
  {
    builder: (value: string) => [
      createPropertyTag('og:type', 'og:type', value),
      createMetaTag('twitter:card', 'twitter:card', value),
    ],
    key: 'type',
  },
  {
    builder: (value: string) =>
      createMetaTag('twitter:creator', 'twitter:creator', value),
    key: 'name',
  },
  {
    builder: (value: string) => createMetaTag('author', 'author', value),
    key: 'author',
  },
  {
    builder: (value: string) => createMetaTag('robots', 'robots', value),
    key: 'robots',
  },
  {
    builder: (value: string) =>
      createMetaTag('theme-color', 'theme-color', value),
    key: 'themeColor',
  },
  {
    builder: (value: string) => createMetaTag('keywords', 'keywords', value),
    key: 'keywords',
  },
  {
    builder: (value: string) => createLinkTag('canonical', 'canonical', value),
    key: 'canonical',
  },
  {
    builder: (value: string) => createPropertyTag('og:url', 'og:url', value),
    key: 'ogUrl',
  },
  {
    builder: (value: string) =>
      createPropertyTag('og:site_name', 'og:site_name', value),
    key: 'siteName',
  },
  {
    builder: (value: string) => [
      createPropertyTag('og:image', 'og:image', value),
      createMetaTag('twitter:image', 'twitter:image', value),
    ],
    key: 'ogImage',
  },
  {
    builder: (value: string) =>
      createPropertyTag('og:locale', 'og:locale', value),
    key: 'ogLocale',
  },
  {
    builder: (value: string) =>
      createMetaTag('twitter:site', 'twitter:site', value),
    key: 'twitterSite',
  },
  {
    builder: (value: string) =>
      createMetaTag('twitter:image:alt', 'twitter:image:alt', value),
    key: 'twitterImageAlt',
  },
  {
    builder: (value: string) =>
      createMetaTag('mobile-web-app-capable', 'mobile-web-app-capable', value),
    key: 'mobileWebAppCapable',
  },
  {
    builder: (value: string) =>
      createMetaTag(
        'apple-mobile-web-app-capable',
        'apple-mobile-web-app-capable',
        value,
      ),
    key: 'appleMobileWebAppCapable',
  },
  {
    builder: (value: string) =>
      createLinkTag('apple-touch-icon', 'apple-touch-icon', value),
    key: 'appleTouchIcon',
  },
  {
    builder: (value: string) => createLinkTag('manifest', 'manifest', value),
    key: 'manifest',
  },
  {
    builder: (value: string) =>
      createMetaTag(
        'msapplication-TileColor',
        'msapplication-TileColor',
        value,
      ),
    key: 'msTileColor',
  },
  {
    builder: (value: string) =>
      createMetaTag(
        'msapplication-TileImage',
        'msapplication-TileImage',
        value,
      ),
    key: 'msTileImage',
  },
  {
    builder: (value: string) =>
      createMetaTag(
        'google-site-verification',
        'google-site-verification',
        value,
      ),
    key: 'googleSiteVerification',
  },
  {
    builder: (value: string) =>
      createMetaTag('yandex-verification', 'yandex-verification', value),
    key: 'yandexVerification',
  },
  {
    builder: (value: string) =>
      createHttpEquivTag(
        'http-equiv-X-UA-Compatible',
        'X-UA-Compatible',
        value,
      ),
    key: 'xUaCompatible',
  },
  {
    builder: (value: string) =>
      createHttpEquivTag(
        'http-equiv-Content-Language',
        'Content-Language',
        value,
      ),
    key: 'contentLanguage',
  },
  {
    builder: (value: string) =>
      createHttpEquivTag('http-equiv-refresh', 'refresh', value),
    key: 'refresh',
  },
];

/**
 * Builds tags from configuration and props
 */
const buildTags = (props: MetaProps): JSX.Element[] => {
  const tags: JSX.Element[] = [];

  for (const config of tagConfigs) {
    const value = props[config.key];
    if (value) {
      const result = config.builder(value as string);
      if (Array.isArray(result)) {
        tags.push(...result);
      } else {
        tags.push(result);
      }
    }
  }

  return tags;
};

/**
 * Renders all specified meta and link tags in head.
 */
const Meta = (props: MetaProps): JSX.Element => {
  const tags = buildTags(props);
  return <>{tags}</>;
};

Meta.displayName = 'Meta';
export default Meta;
