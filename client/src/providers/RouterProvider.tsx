import { ErrorPage } from 'feature/site/ErrorPage';
import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider as Router,
} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import InputPage from 'feature/design/InputPage';

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
const BookmarkPage = lazy(() => import('feature/bookmarks/BookmarkPage'));
const DevelopPage = lazy(() => import('pages/DevelopPage'));
const GenericPage = lazy(() => import('feature/generic/GenericPage'));
const GenericImagePage = lazy(() => import('pages/GenericImagePage'));
const ImageEditPage = lazy(() => import('feature/imageEdit/ImageEditPage'));
const ImagesEditPage = lazy(() => import('feature/imagesEdit/ImagesEditPage'));
const Home = lazy(() => import('feature/home/HomePage'));
const NotFound = lazy(() => import('feature/site/NotFoundPage'));
const PageEditPage = lazy(() => import('feature/pageEdit/PageEditPage'));
const PagesEditPage = lazy(() => import('feature/pagesEdit/PagesEditPage'));
const PhotoPage = lazy(() => import('feature/photos/PhotoPage'));
const Sitemap = lazy(() => import('feature/site/SitemapPage'));
const TikTokPage = lazy(() => import('pages/TikTokPage'));
const YachtsPage = lazy(() => import('pages/YachtsPage'));
const TestsPage = lazy(() => import('feature/tests/TestsPage'));
const TestsEditPage = lazy(() => import('feature/tests/TestsEditPage'));
// Site Pages
const TermsOfUsePage = lazy(() => import('feature/site/TermsOfUsePage'));
const CookiesUsePage = lazy(() => import('feature/site/CookiesUsePage'));
const PrivacyPolicyPage = lazy(() => import('feature/site/PrivacyPolicyPage'));
// Auth Pages
const SigninPage = lazy(() => import('feature/auth/SigninPage'));
const SignoutPage = lazy(() => import('feature/auth/SignoutPage'));
const SignupPage = lazy(() => import('feature/auth/SignupPage'));
const ConfirmEmailPage = lazy(() => import('feature/auth/ConfirmEmailPage'));
const ForgotPasswordPage = lazy(
  () => import('feature/auth/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  () => import('feature/auth/ChangePasswordPage'),
);
const DeleteAccountPage = lazy(() => import('feature/auth/DeleteAccountPage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} path="/">
      <Route element={<NotFound />} path="*" />
      <Route element={<Sitemap />} path="sitemap" />
      <Route element={<ProtectedRoute />}>
        <Route element={<HomeLayout />}>
          <Route element={<Home />} index />
        </Route>

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

        {/* Design */}
        <Route element={<MainLayout />} path="design">
          <Route element={<InputPage />} path="input" />
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
          <Route element={<GenericPage />} path="/:lang?/web/*" />
          <Route element={<TestsPage />} path="/react/testing/test-grid" />
        </Route>

        {/* ADMIN */}
        <Route element={<MainLayout />} path="admin">
          <Route element={<PagesEditPage />} path="pages" />
          <Route element={<PageEditPage />} path="page/edit" />
          <Route element={<PageEditPage />} path="page/edit/:id" />
          <Route element={<ImageEditPage />} path="image/edit" />
          <Route element={<ImageEditPage />} path="image/edit/:id" />
          <Route element={<ImagesEditPage />} path="images" />
          <Route element={<ImagesEditPage />} path="images/new" />
          <Route element={<TestsEditPage />} path="tests/edit" />
          <Route element={<DevelopPage />} path="develop" />
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
