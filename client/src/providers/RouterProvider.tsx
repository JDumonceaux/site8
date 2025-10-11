import { lazy, useMemo } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import ProtectedRoute from './ProtectedRoute';
import ErrorPage from '../features/site/ErrorPage';
import { pageLoader } from '../features/pageEdit/pagePrefetch';

// ---------------------
// Layouts
// ---------------------
const AuthLayout = lazy(
  () => import('../features/layouts/AuthLayout/AuthLayout'),
);
const HomeLayout = lazy(
  () => import('../features/layouts/HomeLayout/HomeLayout'),
);
const GenericLayout = lazy(
  () => import('../features/layouts/GenericLayout/GenericLayout'),
);
const PhotoLayout = lazy(
  () => import('../features/layouts/PhotoLayout/PhotoLayout'),
);

// ---------------------
// Public Pages (No Auth Required)
// ---------------------
const Home = lazy(() => import('../features/home/HomePage'));
const NotFound = lazy(() => import('../features/site/NotFoundPage'));
const Sitemap = lazy(() => import('../features/site/SitemapPage'));

// Auth Pages (Should NOT be protected)
const SigninPage = lazy(() => import('../features/auth/SigninPage'));
const SignoutPage = lazy(() => import('../features/auth/SignoutPage'));
const SignupPage = lazy(() => import('../features/auth/SignupPage'));
const ConfirmEmailPage = lazy(
  () => import('../features/auth/ConfirmEmailPage'),
);
const ForgotPasswordPage = lazy(
  () => import('../features/auth/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  () => import('../features/auth/ChangePasswordPage'),
);
const DeleteAccountPage = lazy(
  () => import('../features/auth/DeleteAccountPage'),
);

// Legal Pages (Public)
const TermsOfUsePage = lazy(() => import('../features/site/TermsOfUsePage'));
const CookiesUsePage = lazy(() => import('../features/site/CookiesUsePage'));
const PrivacyPolicyPage = lazy(
  () => import('../features/site/PrivacyPolicyPage'),
);

// ---------------------
// Protected Pages (Auth Required)
// ---------------------
const BookmarkPage = lazy(() => import('../features/bookmarks/BookmarkPage'));
const GenericPage = lazy(() => import('../features/generic/GenericPage'));
const GenericImagePage = lazy(
  () => import('../features/generic/GenericImagePage'),
);
const PhotoPage = lazy(() => import('../features/photos/PhotoPage'));
const TikTokPage = lazy(() => import('../features/tiktok/TikTokPage'));
const YachtsPage = lazy(() => import('../features/yatch/YachtsPage'));
const TestsPage = lazy(() => import('../features/tests/TestsPage'));

// Design Pages
const InputPage = lazy(() => import('../features/design/InputPage'));
const DevelopPage = lazy(() => import('../features/design/DevelopPage'));

// ---------------------
// Admin Pages (Require Admin Role)
// ---------------------
const ImageEditPage = lazy(() => import('../features/imageEdit/ImageEditPage'));
const ImagesEditPage = lazy(
  () => import('../features/imagesEdit/ImagesEditPage'),
);
const ItemsAddPage = lazy(() => import('../features/itemsAdd/ItemsAddPage'));
const PageEditPage = lazy(() => import('../features/pageEdit/PageEditPage'));
const PagesEditPage = lazy(() => import('../features/pagesEdit/PagesEditPage'));
const TestsEditPage = lazy(() => import('../features/tests/TestsEditPage'));

/**
 * Creates router configuration with proper route protection and organization
 */
const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route
        errorElement={<ErrorPage />}
        path="/"
      >
        {/* ===== PUBLIC ROUTES (No Authentication Required) ===== */}

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
              />{' '}
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

          {/* Bookmarks */}
          <Route
            element={<GenericLayout />}
            path="bookmarks"
          >
            <Route
              element={<BookmarkPage />}
              index
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
        <Route
          element={
            <ProtectedRoute
            // requiredRoles={['admin']}
            // unauthorizedRedirectTo="/unauthorized"
            />
          }
        >
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
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
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
