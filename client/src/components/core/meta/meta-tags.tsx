import type { JSX } from 'react';

import { isNonEmptyString } from '@lib/utils/boolean-checks';

export type MetaProps = {
  appleMobileWebAppCapable?: string;
  appleTouchIcon?: string;
  author?: string;
  canonical?: string;
  charset?: string;
  contentLanguage?: string;
  description?: string;
  googleSiteVerification?: string;
  keywords?: string;
  manifest?: string;
  mobileWebAppCapable?: string;
  msTileColor?: string;
  msTileImage?: string;
  name?: string;
  ogImage?: string;
  ogLocale?: string;
  ogUrl?: string;
  refresh?: string;
  robots?: string;
  siteName?: string;
  themeColor?: string;
  title?: string;
  twitterImageAlt?: string;
  twitterSite?: string;
  type?: 'article' | 'book' | 'profile' | 'website';
  viewport?: string;
  xUaCompatible?: string;
  yandexVerification?: string;
};

type TagConfig = {
  builder: (value: string) => JSX.Element | JSX.Element[];
  key: keyof MetaProps;
};

const createMetaTag = (
  key: string,
  name: string,
  content: string,
): JSX.Element => (
  <meta
    content={content}
    key={key}
    name={name}
  />
);

const createPropertyTag = (
  key: string,
  property: string,
  content: string,
): JSX.Element => (
  <meta
    content={content}
    key={key}
    property={property}
  />
);

const createLinkTag = (key: string, rel: string, href: string): JSX.Element => (
  <link
    href={href}
    key={key}
    rel={rel}
  />
);

const createHttpEquivTag = (
  key: string,
  httpEquiv: string,
  content: string,
): JSX.Element => (
  <meta
    content={content}
    httpEquiv={httpEquiv}
    key={key}
  />
);

const tagConfigs: TagConfig[] = [
  {
    builder: (value: string) => (
      <meta
        charSet={value}
        key="charset"
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

export const buildMetaTags = (props: MetaProps): JSX.Element[] => {
  const tags: JSX.Element[] = [];

  for (const config of tagConfigs) {
    const value = props[config.key];
    if (!isNonEmptyString(value)) {
      continue;
    }

    const result = config.builder(value);
    if (Array.isArray(result)) {
      tags.push(...result);
    } else {
      tags.push(result);
    }
  }

  return tags;
};
