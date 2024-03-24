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

const CheatPage = lazy(() => import('pages/CheatPage'));
const GenericPage = lazy(() => import('pages/GenericPage'));
const Home = lazy(() => import('pages/HomePage'));
const NotFound = lazy(() => import('pages/NotFound'));
const Sitemap = lazy(() => import('pages/SitemapPage'));

const Artists = lazy(() => import('pages/Artists'));
const ArtList = lazy(() => import('pages/ArtList'));

const MusicList = lazy(() => import('pages/MusicList'));
const PhotoPage = lazy(() => import('pages/PhotoPage'));
const BookmarkPage = lazy(() => import('pages/BookmarkPage'));
const Yachts = lazy(() => import('pages/YachtsPage'));
const PageEdit = lazy(() => import('pages/PageEdit'));
const PagesList = lazy(() => import('pages/PagesList'));
const GraphGLPage = lazy(() => import('pages/GraphGLPage'));
const PhotoLayout = lazy(() => import('pages/Layouts/PhotoLayout/PhotoLayout'));
const TestGrid = lazy(() => import('pages/TestGridPage'));
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

        {/* REACT */}
        <Route element={<MainLayout />} path="react">
          <Route
            element={<GenericPage id={1001} pageTitle="Generic Page" />}
            path="1001"
          />
          <Route path="tutorial">
            <Route
              element={<GenericPage id={1} pageTitle="React Tutorial" />}
              path="1"
            />
            <Route
              element={<GenericPage id={2} pageTitle="Creating A Project" />}
              path="2"
            />
            <Route
              element={<GenericPage id={3} pageTitle="Creating A Project" />}
              path="3"
            />
            <Route
              element={<GenericPage id={4} pageTitle="Creating A Project" />}
              path="4"
            />
          </Route>
          <Route
            element={<GenericPage id={901} pageTitle="Internationalization" />}
            path="internationalization"
          />
        </Route>

        {/* IDE */}
        <Route element={<MainLayout />} path="ide">
          <Route
            element={<GenericPage id={2001} pageTitle="Chrome Extensions" />}
            path="chrome-extensions"
          />
          <Route
            element={<GenericPage id={2002} pageTitle="GIT" />}
            path="git"
          />
          <Route
            element={<GenericPage id={2003} pageTitle="Visual Studio Code" />}
            path="vsc"
          />
          <Route
            element={
              <GenericPage
                id={2004}
                pageTitle="Visual Studio Code: Extensions"
              />
            }
            path="vsc/extensions"
          />
          <Route
            element={
              <GenericPage id={54} pageTitle="Visual Studio Code: Help" />
            }
            path="vsc/help"
          />
          <Route element={<GenericPage id={55} pageTitle="NPM" />} path="npm" />
          <Route element={<GenericPage id={56} pageTitle="Git" />} path="git" />
          <Route
            element={<GenericPage id={57} pageTitle="GitHub" />}
            path="github"
          />
          <Route
            element={<GenericPage id={58} pageTitle="AWS Commit" />}
            path="aws/commit"
          />
        </Route>

        {/* WEB */}
        <Route element={<MainLayout />} path="web">
          <Route
            element={<GenericPage id={0} pageTitle="HTML" />}
            path="html"
          />
        </Route>

        {/* DESIGN */}
        <Route element={<MainLayout />} path="style">
          <Route
            element={<GenericPage id={900} pageTitle="CSS Overview" />}
            path="css"
          />
          <Route
            element={<GenericPage id={0} pageTitle="Responsive Design" />}
            path="responsive-design"
          />
          <Route
            element={<GenericPage id={0} pageTitle="Material Design" />}
            path="material-design"
          />
          <Route
            element={<GenericPage id={0} pageTitle="Print Design" />}
            path="print-design"
          />
          <Route
            element={<GenericPage id={0} pageTitle="Font Pairing" />}
            path="font-pairing"
          />
          <Route
            element={<GenericPage id={0} pageTitle="Parallax Scrolling" />}
            path="parallax-scrolling"
          />
          <Route
            element={<GenericPage id={0} pageTitle="Kinetic Typography" />}
            path="kinetic-typography"
          />
          <Route
            element={<GenericPage id={0} pageTitle="Microinteractions" />}
            path="microinteractions"
          />
          <Route
            element={<GenericPage id={0} pageTitle="CSS New Features" />}
            path="css/new"
          />
          <Route
            element={<GenericPage id={0} pageTitle="CSS References" />}
            path="css/references"
          />
        </Route>

        {/* TESTING */}
        <Route element={<MainLayout />} path="testing">
          <Route element={<TestGrid />} index />
        </Route>

        {/* Programming */}
        <Route element={<MainLayout />} path="programming">
          <Route
            element={<GenericPage id={0} pageTitle="Programming" />}
            path="font-pairing"
          />
          <Route
            element={<GenericPage id={0} pageTitle="SOLID" />}
            path="solid"
          />
          <Route
            element={<GenericPage id={0} pageTitle="Design Patterns" />}
            path="design-patterns"
          />
          <Route
            element={<GenericPage id={0} pageTitle="Programming Challenges" />}
            path="programming-challenges"
          />
        </Route>

        {/* OTHER STUFF */}
        <Route element={<MainLayout />} path="other">
          <Route path="art">
            <Route element={<ArtList />} index />
            <Route element={<Artists />} path="kelly-boesh" />
            <Route element={<Artists />} path="shag" />
          </Route>

          <Route path="resources">
            <Route element={<BookmarkPage />} index />
          </Route>
          <Route path="videos">
            <Route element={<MusicList />} index />
            <Route element={<MusicList />} path="you-tube" />
          </Route>
        </Route>
        {/* ADMIN */}
        <Route element={<MainLayout />} path="admin">
          <Route element={<PagesList />} path="pages" />
          <Route element={<PageEdit />} path="page/edit" />
          <Route element={<PageEdit />} path="page/edit/:id" />
        </Route>

        {/* STYLES */}
        <Route element={<MainLayout />} path="design">
          <Route
            element={<GenericPage id={1003} pageTitle="Corporate Memphis" />}
            path="corporate-memphis-design"
          />
          <Route
            element={<GenericPage id={1002} pageTitle="Flat Design" />}
            path="flat-design"
          />
          <Route
            element={<GenericPage id={1004} pageTitle="Glassmorphism" />}
            path="glassmorphism"
          />
          <Route
            element={<GenericPage id={1005} pageTitle="Minimalism" />}
            path="minimalism"
          />
          <Route
            element={<GenericPage id={1006} pageTitle="Neumorphism" />}
            path="neumorphism"
          />
          <Route
            element={<GenericPage id={1007} pageTitle="Retrofuturism" />}
            path="retrofuturism"
          />
          <Route
            element={<GenericPage id={1001} pageTitle="Skeuomorphism" />}
            path="skeuomorphism"
          />
          <Route
            element={<GenericPage id={1008} pageTitle="Swiss Style" />}
            path="swiss-style"
          />
        </Route>
        {/* General */}
        <Route element={<PhotoLayout />} path="general">
          <Route element={<BookmarkPage />} path="bookmarks" />
          <Route element={<PhotoPage />} path="photos" />
        </Route>
        {/* Example */}
        <Route path="example">
          <Route element={<GraphGLPage />} path="graphgl" />
        </Route>

        {/* Art */}
        <Route element={<MainLayout />} path="art">
          <Route
            element={
              <GenericPage id={3001} pageTitle="At Last - Pleasantville" />
            }
            path="at-last-pleasantville"
          />
          <Route
            element={<GenericPage id={3002} pageTitle="Gallos" />}
            path="gallos"
          />
          <Route
            element={
              <GenericPage id={3003} pageTitle="Shoes on the Danube Bank" />
            }
            path="shoes-on-the-danube-bank"
          />
          <Route element={<Yachts />} path="yachts" />
          <Route
            element={<GenericPage id={5001} pageTitle="Puzzles - Lazel" />}
            path="puzzles-lazel"
          />
          <Route
            element={
              <GenericPage id={5002} pageTitle="Puzzles - The Puzzle Lab" />
            }
            path="puzzles-the-puzzle-lab"
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<CheatPage />} path="cheatsheet/html/:id/:title" />
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
            <Route element={<DeleteAccountPage />} path="delete" />
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
