import { lazy } from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider as Router,
} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import InputPage from '../features/design/InputPage';
import ErrorPage from '../features/site/ErrorPage';

const AuthLayout = lazy(
  async () => import('features/layouts/AuthLayout/AuthLayout'),
);
const HomeLayout = lazy(
  async () => import('features/layouts/HomeLayout/HomeLayout'),
);
const GenericLayout = lazy(
  async () => import('features/layouts/GenericLayout/GenericLayout'),
);
const PhotoLayout = lazy(
  async () => import('features/layouts/PhotoLayout/PhotoLayout'),
);
const BookmarkPage = lazy(
  async () => import('../features/bookmarks/BookmarkPage'),
);
const DevelopPage = lazy(async () => import('../features/design/DevelopPage'));
const GenericPage = lazy(async () => import('../features/generic/GenericPage'));
const GenericImagePage = lazy(
  async () => import('../features/generic/GenericImagePage'),
);
const ImageEditPage = lazy(
  async () => import('../features/imageEdit/ImageEditPage'),
);
const ImagesEditPage = lazy(
  async () => import('../features/imagesEdit/ImagesEditPage'),
);
const ItemsAddPage = lazy(
  async () => import('../features/itemsAdd/ItemsAddPage'),
);
const Home = lazy(async () => import('../features/home/HomePage'));
const NotFound = lazy(async () => import('../features/site/NotFoundPage'));
const PageEditPage = lazy(
  async () => import('../features/pageEdit/PageEditPage'),
);
const PagesEditPage = lazy(
  async () => import('../features/pagesEdit/PagesEditPage'),
);
const PhotoPage = lazy(async () => import('../features/photos/PhotoPage'));
const Sitemap = lazy(async () => import('../features/site/SitemapPage'));
const TikTokPage = lazy(async () => import('../features/tiktok/TikTokPage'));
const YachtsPage = lazy(async () => import('../features/yatch/YachtsPage'));
const TestsPage = lazy(async () => import('../features/tests/TestsPage'));
const TestsEditPage = lazy(
  async () => import('../features/tests/TestsEditPage'),
);
// Site Pages
const TermsOfUsePage = lazy(
  async () => import('../features/site/TermsOfUsePage'),
);
const CookiesUsePage = lazy(
  async () => import('../features/site/CookiesUsePage'),
);
const PrivacyPolicyPage = lazy(
  async () => import('../features/site/PrivacyPolicyPage'),
);
// Auth Pages
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} path="/">
      <Route element={<NotFound />} path="*" />
      <Route element={<Sitemap />} path="sitemap" />
      <Route element={<ProtectedRoute />}>
        <Route element={<HomeLayout />}>
          <Route element={<Home />} index />
        </Route>

        {/* Generic */}
        <Route element={<GenericLayout />}>
          <Route element={<GenericPage />} path="/accessibility/*" />
          <Route element={<GenericPage />} path="/aws/*" />
          <Route element={<GenericPage />} path="/code-snippets/*" />
          <Route element={<GenericPage />} path="/fun">
            <Route element={<TikTokPage />} path="/fun/tiktock" />
            <Route element={<YachtsPage />} path="/fun/yachts" />
            <Route element={<GenericImagePage />} path="/fun/images" />
            <Route element={<GenericPage />} path="/fun/*" />
          </Route>
          <Route element={<GenericPage />} path="/:lang?/fun/*" />
          <Route element={<GenericPage />} path="/html/*" />
          <Route element={<GenericPage />} path="/interview-questions/*" />
          <Route element={<GenericPage />} path="/javascript/*" />
          <Route element={<GenericPage />} path="/management/*" />
          <Route element={<GenericPage />} path="/nextjs/*" />
          <Route element={<GenericPage />} path="/nodejs/*" />
          <Route element={<GenericPage />} path="/programming/*" />
          <Route element={<GenericPage />} path="/:lang?/programming/*" />
          <Route element={<GenericPage />} path="/python/*" />
          <Route element={<GenericPage />} path="/react/*" />
          <Route element={<GenericPage />} path="/react-a-z/*" />
          <Route element={<GenericPage />} path="/typescript/*" />
          <Route element={<GenericPage />} path="/web/*" />
        </Route>

        {/* Design */}
        <Route element={<GenericLayout />} path="design">
          <Route element={<InputPage />} path="input" />
        </Route>

        {/* Bookmarks */}
        <Route element={<GenericLayout />} path="bookmarks">
          <Route element={<BookmarkPage />} />
        </Route>

        <Route element={<GenericLayout />}>
          <Route element={<PhotoLayout />}>
            <Route element={<PhotoPage />} path="fun/photos" />
          </Route>
          <Route element={<TestsPage />} path="/react/testing/test-grid" />
        </Route>

        {/* ADMIN */}
        <Route element={<GenericLayout />} path="admin">
          <Route element={<PagesEditPage />} path="pages" />
          <Route element={<PageEditPage />} path="page/edit" />
          <Route element={<PageEditPage />} path="page/edit/:id" />
          <Route element={<ImageEditPage />} path="image/edit" />
          <Route element={<ImageEditPage />} path="image/edit/:id" />
          <Route element={<ImagesEditPage />} path="images" />
          <Route element={<ImagesEditPage />} path="images/new" />
          <Route element={<ImagesEditPage />} path="images/edit" />
          <Route element={<ItemsAddPage />} path="items/add" />
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
