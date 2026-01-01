import { useEffect, useEffectEvent } from 'react';
import { preconnect, prefetchDNS, preinit, preload } from 'react-dom';

/**
 * Hook that preloads critical resources using React 19 APIs.
 * Utilizes preload, preinit, preconnect, and prefetchDNS for optimal performance.
 */
export const usePreloadResources = () => {
  const preloadResourcesEvent = useEffectEvent(() => {
    // 1. DNS Prefetch for external domains (earliest connection stage)
    prefetchDNS('https://fonts.googleapis.com');
    prefetchDNS('https://fonts.gstatic.com');
    prefetchDNS('https://player.vimeo.com'); // Used in YachtsPage

    // 2. Preconnect to origins we'll fetch from (establishes full connection)
    preconnect('https://fonts.googleapis.com');
    preconnect('https://fonts.gstatic.com', { crossOrigin: 'anonymous' });

    // API server (if different from app origin)
    const apiUrl = import.meta.env['VITE_API_URL'];
    if (apiUrl && !apiUrl.startsWith(window.location.origin)) {
      preconnect(apiUrl);
    }

    // 3. Preinit critical stylesheets (blocking, high priority)
    // These are loaded AND executed immediately
    preinit('/src/styles/reset.css', { as: 'style', precedence: 'reset' });
    preinit('/src/styles/main.css', { as: 'style', precedence: 'default' });

    // 4. Preinit Google Fonts (external stylesheet)
    preinit(
      'https://fonts.googleapis.com/css2?family=Inter&family=Open+Sans&family=Roboto+Slab&family=Shadows+Into+Light&display=swap',
      {
        as: 'style',
        crossOrigin: 'anonymous',
        precedence: 'default',
      },
    );

    // 5. Preload fonts for faster text rendering (optional but recommended)
    // Note: These would need actual font file URLs from Google Fonts
    // Example if hosting custom fonts:
    // preload('/fonts/CustomFont.woff2', {
    //   as: 'font',
    //   type: 'font/woff2',
    //   crossOrigin: 'anonymous',
    // });

    // 6. Preload critical API endpoints (high-priority data)
    // Menu is loaded on app init via AppInitializer
    preload(`${apiUrl || 'http://localhost:3005/api'}/menus`, {
      as: 'fetch',
      crossOrigin: 'anonymous',
    });

    // 7. Preload lazy-loaded route components
    // These are the most commonly accessed routes
    preload('/src/features/home/HomePage.tsx', { as: 'script' });
    preload('/src/features/generic/GenericPage.tsx', { as: 'script' });

    // 8. Preload critical images (if any hero images exist)
    // Example:
    // preload('/images/hero.webp', {
    //   as: 'image',
    //   type: 'image/webp',
    // });
  });

  useEffect(() => {
    preloadResourcesEvent();
  }, []);
};
