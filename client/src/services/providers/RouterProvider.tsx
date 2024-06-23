import { ErrorPage } from 'pages/ErrorPage';
import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider as Router,
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
const AuthLayout = lazy(() => import('pages/Layouts/AuthLayout/AuthLayout'));
const HomeLayout = lazy(() => import('pages/Layouts/HomeLayout/HomeLayout'));
const MainLayout = lazy(() => import('pages/Layouts/MainLayout/MainLayout'));
const GenericPage = lazy(() => import('pages/GenericPage'));
const GenericImagePage = lazy(() => import('pages/GenericImagePage'));
const ImageEditPage = lazy(() => import('pages/ImageEditPage'));
const Home = lazy(() => import('pages/HomePage'));
const NotFound = lazy(() => import('pages/NotFoundPage'));
const BookmarkPage = lazy(() => import('pages/BookmarkPage'));
const PageEditPage = lazy(() => import('pages/PageEditPage'));
const PagesEditPage = lazy(() => import('pages/PagesEditPage'));
const PhotoPage = lazy(() => import('pages/PhotoPage'));
const PhotoLayout = lazy(() => import('pages/Layouts/PhotoLayout/PhotoLayout'));
const Sitemap = lazy(() => import('pages/SitemapPage'));
const TikTokPage = lazy(() => import('pages/TikTokPage'));
const YachtsPage = lazy(() => import('pages/YachtsPage'));
const TestsPage = lazy(() => import('pages/TestsPage'));
const TestsEditPage = lazy(() => import('pages/TestsEditPage'));
// Site Pages
const TermsOfUsePage = lazy(() => import('pages/site/TermsOfUsePage'));
const CookiesUsePage = lazy(() => import('pages/site/CookiesUsePage'));
const PrivacyPolicyPage = lazy(() => import('pages/site/PrivacyPolicyPage'));
// Auth Pages
const SigninPage = lazy(() => import('pages/auth/SigninPage'));
const SignoutPage = lazy(() => import('pages/auth/SignoutPage'));
const SignupPage = lazy(() => import('pages/auth/SignupPage'));
const ConfirmEmailPage = lazy(() => import('pages/auth/ConfirmEmailPage'));
const ForgotPasswordPage = lazy(() => import('pages/auth/ForgotPasswordPage'));
const ChangePasswordPage = lazy(() => import('pages/auth/ChangePasswordPage'));
const DeleteAccountPage = lazy(() => import('pages/auth/DeleteAccountPage'));

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
