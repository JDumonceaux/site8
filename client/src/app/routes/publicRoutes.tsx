// Route configuration files export JSX elements, not components — fast-refresh warning suppressed intentionally.
/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const UnifiedLayout = lazy(
  async () => import('../../features/layouts/unified-layout/UnifiedLayout'),
);
const Home = lazy(async () => import('../../features/home/HomePage'));
const Sitemap = lazy(async () => import('../../features/site/SitemapPage'));
const TermsOfUsePage = lazy(
  async () => import('../../features/site/TermsOfUsePage'),
);
const CookiesUsePage = lazy(
  async () => import('../../features/site/CookiesUsePage'),
);
const PrivacyPolicyPage = lazy(
  async () => import('../../features/site/PrivacyPolicyPage'),
);

/**
 * Public routes that don't require authentication
 * Includes home, sitemap, and legal pages
 */
export const publicRoutes = (
  <>
    {/* Home Page */}
    <Route element={<UnifiedLayout hasInitializer />}>
      <Route
        element={<Home />}
        index
      />
    </Route>
    {/* Public Utility Routes */}
    <Route
      element={<Sitemap />}
      path="sitemap"
    />
    {/* Legal Pages */}
    <Route element={<UnifiedLayout hasHeader />}>
      <Route
        element={<TermsOfUsePage />}
        path="terms-of-use"
      />
      <Route
        element={<CookiesUsePage />}
        path="cookies"
      />
      <Route
        element={<PrivacyPolicyPage />}
        path="privacy-policy"
      />
    </Route>
  </>
);
