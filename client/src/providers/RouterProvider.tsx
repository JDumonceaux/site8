import { lazy, useMemo } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import MusicPage from '@features/music/MusicPage';
import { QueryClient } from '@tanstack/react-query';
import { pageLoader } from '../features/page-edit/pagePrefetch';
import ErrorPage from '../features/site/ErrorPage';
import ProtectedRoute from './ProtectedRoute';

// ---------------------
// Layouts
// ---------------------
const AuthLayout = lazy(
  async () => import('../features/layouts/auth-layout/AuthLayout'),
);
const HomeLayout = lazy(
  async () => import('../features/layouts/home-layout/HomeLayout'),
);
const GenericLayout = lazy(
  async () => import('../features/layouts/generic-layout/GenericLayout'),
);
const PhotoLayout = lazy(
  async () => import('../features/layouts/photo-layout/PhotoLayout'),
);

// ---------------------
// Public Pages (No Auth Required)
// ---------------------
const Home = lazy(async () => import('../features/home/HomePage'));
const NotFound = lazy(async () => import('../features/site/NotFoundPage'));
const Sitemap = lazy(async () => import('../features/site/SitemapPage'));

// Auth Pages (Should NOT be protected)
const SigninPage = lazy(async () => import('../features/auth/SigninPage'));
const SignoutPage = lazy(async () => import('../features/auth/SignoutPage'));
const SignupPage = lazy(async () => import('../features/auth/SignupPage'));
const ConfirmEmailPage = lazy(
  async () => import('../features/auth/ConfirmEmailPage'),
);
const ForgotPasswordPage = lazy(
  async () => import('../features/auth/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  async () => import('../features/auth/ChangePasswordPage'),
);
const DeleteAccountPage = lazy(
  async () => import('../features/auth/DeleteAccountPage'),
);

// Legal Pages (Public)
const TermsOfUsePage = lazy(
  async () => import('../features/site/TermsOfUsePage'),
);
const CookiesUsePage = lazy(
  async () => import('../features/site/CookiesUsePage'),
);
const PrivacyPolicyPage = lazy(
  async () => import('../features/site/PrivacyPolicyPage'),
);

// ---------------------
// Protected Pages (Auth Required)
// ---------------------
const BookmarkPage = lazy(
  async () => import('../features/bookmarks/BookmarkPage'),
);
const GenericPage = lazy(async () => import('../features/generic/GenericPage'));
const GenericImagePage = lazy(
  async () => import('../features/generic/GenericImagePage'),
);
const PhotoPage = lazy(async () => import('../features/photos/PhotoPage'));
const TikTokPage = lazy(async () => import('../features/tiktok/TikTokPage'));
const YachtsPage = lazy(async () => import('../features/yatch/YachtsPage'));
const TestsPage = lazy(async () => import('../features/tests/TestsPage'));

// Design Pages
const InputPage = lazy(async () => import('../features/design/InputPage'));
const DevelopPage = lazy(async () => import('../features/design/DevelopPage'));

// ---------------------
// Admin Pages (Require Admin Role)
// ---------------------
const ImageEditPage = lazy(
  async () => import('../features/image-edit/ImageEditPage'),
);
const ImagesEditPage = lazy(
  async () => import('../features/images-edit/ImagesEditPage'),
);
const ItemsAddPage = lazy(
  async () => import('../features/items-add/ItemsAddPage'),
);
const PageEditPage = lazy(
  async () => import('../features/page-edit/PageEditPage'),
);
const PagesEditPage = lazy(
  async () => import('../features/pages-edit/PagesEditPage'),
);
const TestsEditPage = lazy(
  async () => import('../features/tests/TestsEditPage'),
);

/**
 * Creates router configuration with proper route protection and organization
 */
const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        errorElement={<ErrorPage />}
      >
        {/* ===== PUBLIC ROUTES (No Authentication Required) ===== */}

        {/* Home Page */}
        <Route element={<HomeLayout />}>
          <Route
            index
            element={<Home />}
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

        {/* ===== AUTHENTICATION ROUTES (For Unauthenticated Users) ===== */}
        <Route element={<AuthLayout />}>
          <Route
            element={<SigninPage />}
            path="signin"
          />
          <Route
            element={<SignupPage />}
            path="signup"
          />
          <Route
            element={<SignoutPage />}
            path="signout"
          />
          <Route
            element={<ConfirmEmailPage />}
            path="confirm"
          />

          {/* Password Management */}
          <Route path="password">
            <Route
              element={<ForgotPasswordPage />}
              path="forgot"
            />
            <Route
              element={<ChangePasswordPage />}
              path="change"
            />
          </Route>

          {/* Account Management */}
          <Route path="account">
            <Route
              element={<DeleteAccountPage />}
              path="delete"
            />
          </Route>
        </Route>

        {/* ===== PROTECTED ROUTES (Authentication Required) ===== */}
        <Route element={<ProtectedRoute />}>
          {/* Content Routes */}
          <Route element={<GenericLayout />}>
            <Route
              element={<GenericPage />}
              path="accessibility/*"
            />
            <Route
              element={<GenericPage />}
              path="aws/*"
            />
            <Route
              element={<GenericPage />}
              path="code-snippets/*"
            />
            <Route
              element={<GenericPage />}
              path="html/*"
            />
            <Route
              element={<GenericPage />}
              path="interview-questions/*"
            />
            <Route
              element={<GenericPage />}
              path="javascript/*"
            />
            <Route
              element={<GenericPage />}
              path="management/*"
            />
            <Route
              element={<GenericPage />}
              path="nextjs/*"
            />
            <Route
              element={<GenericPage />}
              path="nodejs/*"
            />
            <Route
              element={<GenericPage />}
              path="programming/*"
            />
            <Route
              element={<GenericPage />}
              path=":lang?/programming/*"
            />
            <Route
              element={<GenericPage />}
              path="python/*"
            />
            <Route
              element={<GenericPage />}
              path="react/*"
            />
            <Route
              element={<GenericPage />}
              path="react-a-z/*"
            />
            <Route
              element={<GenericPage />}
              path="typescript/*"
            />
            <Route
              element={<GenericPage />}
              path="web/*"
            />

            {/* Fun Section */}
            <Route path="fun">
              <Route
                element={<TikTokPage />}
                path="tiktok"
              />
              {/* Fixed typo */}
              <Route
                element={<YachtsPage />}
                path="yachts"
              />
              <Route
                element={<GenericImagePage />}
                path="images"
              />
              <Route element={<PhotoLayout />}>
                <Route
                  element={<PhotoPage />}
                  path="photos"
                />
              </Route>
              <Route
                element={<GenericPage />}
                path="*"
              />
            </Route>
            <Route
              element={<GenericPage />}
              path=":lang?/fun/*"
            />
          </Route>

          {/* Design Tools */}
          <Route
            element={<GenericLayout />}
            path="design"
          >
            <Route
              element={<InputPage />}
              path="input"
            />
          </Route>

          {/* Music */}
          <Route
            element={<GenericLayout />}
            path="music"
          >
            <Route
              index
              element={<MusicPage />}
            />
          </Route>

          {/* Bookmarks */}
          <Route
            element={<GenericLayout />}
            path="bookmarks"
          >
            <Route
              index
              element={<BookmarkPage />}
            />
          </Route>

          {/* Testing */}
          <Route element={<GenericLayout />}>
            <Route
              element={<TestsPage />}
              path="react/testing/test-grid"
            />
          </Route>
        </Route>

        {/* ===== ADMIN ROUTES (Admin Role Required) ===== */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={<GenericLayout />}
            path="admin"
          >
            <Route
              element={<PagesEditPage />}
              path="pages"
            />
            <Route
              element={<PageEditPage />}
              path="page/edit"
            />
            <Route
              element={<PageEditPage />}
              path="page/edit/:id"
              loader={pageLoader(queryClient)}
            />
            <Route
              element={<ImageEditPage />}
              path="image/edit"
            />
            <Route
              element={<ImageEditPage />}
              path="image/edit/:id"
            />
            <Route
              element={<ImagesEditPage />}
              path="images"
            />
            <Route
              element={<ImagesEditPage />}
              path="images/new"
            />
            <Route
              element={<ImagesEditPage />}
              path="images/edit"
            />
            <Route
              element={<ItemsAddPage />}
              path="items/add"
            />
            <Route
              element={<TestsEditPage />}
              path="tests/edit"
            />
            <Route
              element={<DevelopPage />}
              path="develop"
            />
          </Route>
        </Route>

        {/* ===== FALLBACK ROUTES ===== */}
        <Route
          element={<NotFound />}
          path="*"
        />
      </Route>,
    ),
  );
};

/**
 * App Router component with proper QueryClient management
 */
const AppRouter = () => {
  // Create QueryClient once and memoize it
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 10 * 60 * 1000, // 10 minutes
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      }),
    [],
  );

  // Create router with the stable QueryClient
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};

AppRouter.displayName = 'AppRouter';
export default AppRouter;
