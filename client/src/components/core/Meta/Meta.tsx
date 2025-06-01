import type { JSX } from 'react';

/**
 * Props for Meta component defining various head and link tags.
 */
type MetaProps = {
  /** Character encoding */
  charset?: string;
  /** Viewport settings (e.g., "width=device-width, initial-scale=1") */
  viewport?: string;
  /** Page title */
  title?: string;
  /** Meta description */
  description?: string;
  /** Twitter/Facebook creator handle (e.g. @username) */
  name?: string;
  /** Author of the document */
  author?: string;
  /** Search engine instructions (e.g., "index,follow") */
  robots?: string;
  /** Theme color for mobile browsers */
  themeColor?: string;
  /** SEO keywords */
  keywords?: string;
  /** Canonical URL */
  canonical?: string;
  /** OpenGraph/Twitter card type */
  type?: 'article' | 'book' | 'profile' | 'website';
  /** OpenGraph URL */
  ogUrl?: string;
  /** OpenGraph site name */
  siteName?: string;
  /** OpenGraph image URL */
  ogImage?: string;
  /** OpenGraph locale (e.g., "en_US") */
  ogLocale?: string;
  /** Twitter site handle (e.g., @site) */
  twitterSite?: string;
  /** Twitter image alt text */
  twitterImageAlt?: string;
  /** Mobile web app capable flag */
  mobileWebAppCapable?: string;
  /** Apple mobile web app capable flag */
  appleMobileWebAppCapable?: string;
  /** Apple touch icon URL */
  appleTouchIcon?: string;
  /** PWA manifest URL */
  manifest?: string;
  /** Microsoft tile color */
  msTileColor?: string;
  /** Microsoft tile image URL */
  msTileImage?: string;
  /** Google site verification token */
  googleSiteVerification?: string;
  /** Yandex site verification token */
  yandexVerification?: string;
  /** HTTP-Equiv: X-UA-Compatible */
  xUaCompatible?: string;
  /** HTTP-Equiv: Content-Language */
  contentLanguage?: string;
  /** HTTP-Equiv: refresh content (seconds) */
  refresh?: string;
};

/** Tag builder functions */
const buildCharsetTag = (charset: string): JSX.Element => (
  <meta key="charset" charSet={charset} />
);

const buildViewportTag = (viewport: string): JSX.Element => (
  <meta key="viewport" name="viewport" content={viewport} />
);

const buildTitleTags = (title: string): JSX.Element[] => [
  <title key="title">{title}</title>,
  <meta key="og:title" property="og:title" content={title} />,
  <meta key="twitter:title" name="twitter:title" content={title} />,
];

const buildTypeTags = (cardType: MetaProps['type']): JSX.Element[] => [
  <meta key="og:type" property="og:type" content={cardType} />,
  <meta key="twitter:card" name="twitter:card" content={cardType} />,
];

const buildDescriptionTags = (description: string): JSX.Element[] => [
  <meta key="description" name="description" content={description} />,
  <meta key="og:description" property="og:description" content={description} />,
  <meta
    key="twitter:description"
    name="twitter:description"
    content={description}
  />,
];

const buildCreatorTag = (creator: string): JSX.Element => (
  <meta key="twitter:creator" name="twitter:creator" content={creator} />
);

const buildRobotsTag = (robots: string): JSX.Element => (
  <meta key="robots" name="robots" content={robots} />
);

const buildAuthorTag = (author: string): JSX.Element => (
  <meta key="author" name="author" content={author} />
);

const buildThemeColorTag = (themeColor: string): JSX.Element => (
  <meta key="theme-color" name="theme-color" content={themeColor} />
);

const buildKeywordsTag = (keywords: string): JSX.Element => (
  <meta key="keywords" name="keywords" content={keywords} />
);

const buildCanonicalLink = (canonical: string): JSX.Element => (
  <link key="canonical" rel="canonical" href={canonical} />
);

const buildOgUrlTag = (ogUrl: string): JSX.Element => (
  <meta key="og:url" property="og:url" content={ogUrl} />
);

const buildSiteNameTag = (siteName: string): JSX.Element => (
  <meta key="og:site_name" property="og:site_name" content={siteName} />
);

const buildOgImageTags = (ogImage: string): JSX.Element[] => [
  <meta key="og:image" property="og:image" content={ogImage} />,
  <meta key="twitter:image" name="twitter:image" content={ogImage} />,
];

const buildOgLocaleTag = (locale: string): JSX.Element => (
  <meta key="og:locale" property="og:locale" content={locale} />
);

const buildTwitterSiteTag = (twitterSite: string): JSX.Element => (
  <meta key="twitter:site" name="twitter:site" content={twitterSite} />
);

const buildTwitterImageAltTag = (alt: string): JSX.Element => (
  <meta key="twitter:image:alt" name="twitter:image:alt" content={alt} />
);

const buildMobileWebAppCapableTag = (val: string): JSX.Element => (
  <meta
    key="mobile-web-app-capable"
    name="mobile-web-app-capable"
    content={val}
  />
);

const buildAppleMobileWebAppCapableTag = (val: string): JSX.Element => (
  <meta
    key="apple-mobile-web-app-capable"
    name="apple-mobile-web-app-capable"
    content={val}
  />
);

const buildAppleTouchIconLink = (icon: string): JSX.Element => (
  <link key="apple-touch-icon" rel="apple-touch-icon" href={icon} />
);

const buildManifestLink = (manifest: string): JSX.Element => (
  <link key="manifest" rel="manifest" href={manifest} />
);

const buildMsTileColorTag = (color: string): JSX.Element => (
  <meta
    key="msapplication-TileColor"
    name="msapplication-TileColor"
    content={color}
  />
);

const buildMsTileImageTag = (image: string): JSX.Element => (
  <meta
    key="msapplication-TileImage"
    name="msapplication-TileImage"
    content={image}
  />
);

const buildGoogleSiteVerificationTag = (token: string): JSX.Element => (
  <meta
    key="google-site-verification"
    name="google-site-verification"
    content={token}
  />
);

const buildYandexVerificationTag = (token: string): JSX.Element => (
  <meta key="yandex-verification" name="yandex-verification" content={token} />
);

const buildHttpEquivTag = (httpEquiv: string, content: string): JSX.Element => (
  <meta
    key={`http-equiv-${httpEquiv}`}
    httpEquiv={httpEquiv}
    content={content}
  />
);

/**
 * Renders all specified meta and link tags in head.
 */
const Meta = ({
  charset,
  viewport,
  title,
  description,
  type: cardType,
  name,
  author,
  robots,
  themeColor,
  keywords,
  canonical,
  ogUrl,
  siteName,
  ogImage,
  ogLocale,
  twitterSite,
  twitterImageAlt,
  mobileWebAppCapable,
  appleMobileWebAppCapable,
  appleTouchIcon,
  manifest,
  msTileColor,
  msTileImage,
  googleSiteVerification,
  yandexVerification,
  xUaCompatible,
  contentLanguage,
  refresh,
}: MetaProps): JSX.Element => {
  const tags: JSX.Element[] = [];

  if (charset) tags.push(buildCharsetTag(charset));
  if (viewport) tags.push(buildViewportTag(viewport));
  if (title) tags.push(...buildTitleTags(title));
  if (description) tags.push(...buildDescriptionTags(description));
  if (cardType) tags.push(...buildTypeTags(cardType));
  if (name) tags.push(buildCreatorTag(name));
  if (author) tags.push(buildAuthorTag(author));
  if (robots) tags.push(buildRobotsTag(robots));
  if (themeColor) tags.push(buildThemeColorTag(themeColor));
  if (keywords) tags.push(buildKeywordsTag(keywords));
  if (canonical) tags.push(buildCanonicalLink(canonical));
  if (ogUrl) tags.push(buildOgUrlTag(ogUrl));
  if (siteName) tags.push(buildSiteNameTag(siteName));
  if (ogImage) tags.push(...buildOgImageTags(ogImage));
  if (ogLocale) tags.push(buildOgLocaleTag(ogLocale));
  if (twitterSite) tags.push(buildTwitterSiteTag(twitterSite));
  if (twitterImageAlt) tags.push(buildTwitterImageAltTag(twitterImageAlt));
  if (mobileWebAppCapable)
    tags.push(buildMobileWebAppCapableTag(mobileWebAppCapable));
  if (appleMobileWebAppCapable)
    tags.push(buildAppleMobileWebAppCapableTag(appleMobileWebAppCapable));
  if (appleTouchIcon) tags.push(buildAppleTouchIconLink(appleTouchIcon));
  if (manifest) tags.push(buildManifestLink(manifest));
  if (msTileColor) tags.push(buildMsTileColorTag(msTileColor));
  if (msTileImage) tags.push(buildMsTileImageTag(msTileImage));
  if (googleSiteVerification)
    tags.push(buildGoogleSiteVerificationTag(googleSiteVerification));
  if (yandexVerification)
    tags.push(buildYandexVerificationTag(yandexVerification));
  if (xUaCompatible)
    tags.push(buildHttpEquivTag('X-UA-Compatible', xUaCompatible));
  if (contentLanguage)
    tags.push(buildHttpEquivTag('Content-Language', contentLanguage));
  if (refresh) tags.push(buildHttpEquivTag('refresh', refresh));

  return <>{tags}</>;
};

Meta.displayName = 'Meta';
export default Meta;
