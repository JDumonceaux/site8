import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider as Router,
} from 'react-router-dom';

import { ErrorPage } from 'components/pages/site/ErrorPage';
import ProtectedRoute from './ProtectedRoute';

const AuthLayout = lazy(
  () => import('components/layouts/AuthLayout/AuthLayout'),
);
const HomeLayout = lazy(
  () => import('components/layouts/HomeLayout/HomeLayout'),
);
const MainLayout = lazy(
  () => import('components/layouts/MainLayout/MainLayout'),
);
const PhotoLayout = lazy(
  () => import('components/layouts/PhotoLayout/PhotoLayout'),
);
const BookmarkPage = lazy(
  () => import('components/pages/BookmarkPage/BookmarkPage'),
);
const GenericPage = lazy(
  () => import('components/pages/GenericPage/GenericPage'),
);
const GenericImagePage = lazy(
  () => import('components/pages/GenericImagePage'),
);
const ImageEditPage = lazy(() => import('components/pages/ImageEditPage'));
const ImagesEditPage = lazy(() => import('components/pages/ImagesEditPage'));
const Home = lazy(() => import('components/pages/HomePage'));
const NotFound = lazy(() => import('components/pages/site/NotFoundPage'));
const PageEditPage = lazy(
  () => import('components/pages/PageEditPage/PageEditPage'),
);
const PagesEditPage = lazy(
  () => import('components/pages/PagesEditPage/PagesEditPage'),
);
const PhotoPage = lazy(() => import('components/pages/PhotoPage'));

const Sitemap = lazy(() => import('components/pages/site/SitemapPage'));
const TikTokPage = lazy(() => import('components/pages/TikTokPage'));
const YachtsPage = lazy(() => import('components/pages/YachtsPage'));
const TestsPage = lazy(() => import('components/pages/TestsPage'));
const TestsEditPage = lazy(() => import('components/pages/TestsEditPage'));
// Site Pages
const TermsOfUsePage = lazy(
  () => import('components/pages/site/TermsOfUsePage'),
);
const CookiesUsePage = lazy(
  () => import('components/pages/site/CookiesUsePage'),
);
const PrivacyPolicyPage = lazy(
  () => import('components/pages/site/PrivacyPolicyPage'),
);
// Auth Pages
const SigninPage = lazy(() => import('components/pages/auth/SigninPage'));
const SignoutPage = lazy(() => import('components/pages/auth/SignoutPage'));
const SignupPage = lazy(() => import('components/pages/auth/SignupPage'));
const ConfirmEmailPage = lazy(
  () => import('components/pages/auth/ConfirmEmailPage'),
);
const ForgotPasswordPage = lazy(
  () => import('components/pages/auth/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  () => import('components/pages/auth/ChangePasswordPage'),
);
const DeleteAccountPage = lazy(
  () => import('components/pages/auth/DeleteAccountPage'),
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} path="/">
      <Route element={<NotFound />} path="*" />
      <Route element={<Sitemap />} path="sitemap" />
      <Route element={<ProtectedRoute />}>
        <Route element={<HomeLayout />}>
          <Route element={<Home />} index />
        </Route>

        {/* 1 - PROGRAMMING */}
        <Route element={<MainLayout />}>
          <Route element={<GenericPage />} path="/:lang?/programming/*" />
        </Route>

        {/* 6 - React */}
        <Route element={<MainLayout />}>
          <Route element={<GenericPage />} path="/:lang?/react/*" />
        </Route>

        {/* 14 = AWS */}
        <Route element={<MainLayout />}>
          <Route element={<GenericPage />} path="/:lang?/aws/*" />
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<TikTokPage />} path="fun/tiktock" />
          <Route element={<BookmarkPage />} path="fun/bookmarks" />
          <Route element={<YachtsPage />} path="fun/yachts" />
          <Route element={<GenericImagePage />} path="fun/images" />
          <Route element={<PhotoLayout />}>
            <Route element={<PhotoPage />} path="fun/photos" />
          </Route>
          <Route element={<YachtsPage />} path="fun/yachts" />
          <Route element={<GenericPage />} path="/:lang?/fun/*" />
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<GenericPage />} path="/:lang?/web/*" />
        </Route>

        {/* Test Grid */}
        <Route element={<MainLayout />}>
          <Route element={<TestsPage />} path="/react/testing/test-grid" />
        </Route>

        {/* ADMIN */}
        <Route element={<MainLayout />} path="admin">
          <Route element={<PagesEditPage />} path="pages" />
          <Route element={<PageEditPage />} path="page/edit" />
          <Route element={<PageEditPage />} path="page/edit/:id" />
          <Route element={<ImageEditPage />} path="image/edit" />
          <Route element={<ImageEditPage />} path="image/edit/:id" />
          <Route element={<ImagesEditPage />} path="images/new" />
          <Route element={<TestsEditPage />} path="tests/edit" />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route element={<SigninPage />} path="signin" />
          <Route element={<SignupPage />} path="signup" />
          <Route element={<SignoutPage />} path="signout" />
          <Route element={<ConfirmEmailPage />} path="confirm" />
          <Route path="password">
            <Route element={<ForgotPasswordPage />} path="forgot" />
            <Route element={<ChangePasswordPage />} path="change" />
          </Route>
          <Route path="account">
            <Route element={<DeleteAccountPage />} path="account/delete" />
          </Route>

          <Route element={<TermsOfUsePage />} path="terms-of-use" />
          <Route element={<CookiesUsePage />} path="cookies" />
          <Route element={<PrivacyPolicyPage />} path="privacy-policy" />
        </Route>
      </Route>
    </Route>,
  ),
);

export const RouterProvider = () => {
  return <Router router={router} />;
};
