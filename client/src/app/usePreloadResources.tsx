import { useEffect, useEffectEvent } from 'react';
import { preinit, preload } from 'react-dom';

/**
 * Hook that preloads critical resources using React 19 APIs.
 * Extracted for single-responsibility and easier testing.
 */
export const usePreloadResources = () => {
  const preloadResourcesEvent = useEffectEvent(() => {
    // Preinit critical stylesheets (blocking, high priority)
    preinit('/styles/reset.css', { as: 'style', precedence: 'high' });
    preinit('/styles/main.css', { as: 'style', precedence: 'high' });

    // Preload API endpoints that will be needed soon
    preload('/api/menu', { as: 'fetch', integrity: '' });
    preload('/api/user', { as: 'fetch', integrity: '' });

    // Preload fonts if you have custom fonts
    // preload('/fonts/CustomFont.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  });

  useEffect(() => {
    preloadResourcesEvent();
  }, []);
};
