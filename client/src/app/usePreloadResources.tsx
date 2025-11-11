import { useEffect } from 'react';

/**
 * Hook that preloads a set of resources with appropriate priorities.
 * Extracted for single-responsibility and easier testing.
 */
export const usePreloadResources = () => {
  useEffect(() => {
    const resources = [
      // These are not loading fast enough to be useful
      //{ as: 'script', href: '/lib/utils/i18.js', priority: 'high' },
      //{ as: 'style', href: '/styles/reset.css', priority: 'low' },
      //{ as: 'style', href: '/styles/main.css', priority: 'high' },
    ] as const;

    for (const { as, href, priority } of resources) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = as;
      link.href = href;
      // Only set fetchPriority if supported
      if ('fetchPriority' in link) {
        link.fetchPriority = priority;
      }
      document.head.append(link);
    }
  }, []);
};
