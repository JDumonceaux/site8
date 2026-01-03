import { lazy } from 'react';
import { Route } from 'react-router-dom';

// ---------------------
// Layouts
// ---------------------
const HomeLayout = lazy(
  async () => import('../../features/layouts/home-layout/HomeLayout'),
);
const AuthLayout = lazy(
  async () => import('../../features/layouts/auth-layout/AuthLayout'),
);

// ---------------------
// Pages
// ---------------------
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
    <Route element={<HomeLayout />}>
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
    <Route element={<AuthLayout />}>
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
