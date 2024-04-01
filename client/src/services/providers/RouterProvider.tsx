import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider as Router,
} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import AuthLayout from 'pages/Layouts/AuthLayout/AuthLayout';
import HomeLayout from 'pages/Layouts/HomeLayout/HomeLayout';
import MainLayout from 'pages/Layouts/MainLayout/MainLayout';
import { ErrorPage } from 'pages/ErrorPage';

const GenericPage = lazy(() => import('pages/GenericPage'));
const Home = lazy(() => import('pages/HomePage'));
const NotFound = lazy(() => import('pages/NotFoundPage'));

const BookmarkPage = lazy(() => import('pages/BookmarkPage'));
const PageEditPage = lazy(() => import('pages/PageEditPage'));
const PagesPage = lazy(() => import('pages/PagesPage'));
const PhotoPage = lazy(() => import('pages/PhotoPage'));
const PhotoLayout = lazy(() => import('pages/Layouts/PhotoLayout/PhotoLayout'));
const Sitemap = lazy(() => import('pages/SitemapPage'));
const TikTokPage = lazy(() => import('pages/TikTokPage'));
const YachtsPage = lazy(() => import('pages/YachtsPage'));
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

        {/* 1 - CSS */}
        <Route element={<MainLayout />} path="css">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
        </Route>

        {/* 2 - Design  */}
        <Route element={<MainLayout />} path="design">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
        </Route>

        {/* 3 - Artist */}
        <Route element={<MainLayout />} path="artists">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
          <Route element={<TikTokPage />} path="tiktock" />
        </Route>

        {/* 4 - General */}
        <Route element={<PhotoLayout />} path="other">
          <Route element={<BookmarkPage />} path="bookmarks" />
          <Route element={<PhotoPage />} path="photos" />
        </Route>

        {/* 5 - Cheat Sheets */}
        <Route element={<MainLayout />} path="cheatsheet">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
        </Route>

        {/* 6 - React */}
        <Route element={<MainLayout />} path="react">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
        </Route>

        {/* 7 - React Project */}
        <Route element={<MainLayout />} path="react/project">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
        </Route>

        {/* 8 - Code Solutions */}
        <Route element={<MainLayout />} path="code/solutions">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
        </Route>

        {/* 9 - Patterns */}
        <Route element={<MainLayout />} path="patterns">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
        </Route>

        {/* 10 - Art */}
        <Route element={<MainLayout />} path="art">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
          <Route element={<YachtsPage />} path="yachts" />
        </Route>

        {/* 11 = IDE */}
        <Route element={<MainLayout />} path="ide">
          <Route element={<GenericPage />} index />
          <Route element={<GenericPage />} path=":id" />
        </Route>

        {/* ADMIN */}
        <Route element={<MainLayout />} path="admin">
          <Route element={<PagesPage />} path="pages" />
          <Route element={<PageEditPage />} path="page/edit" />
          <Route element={<PageEditPage />} path="page/edit/:id" />
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
