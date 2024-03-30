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
const Sitemap = lazy(() => import('pages/SitemapPage'));

const Artists = lazy(() => import('pages/Artists'));
const ArtList = lazy(() => import('pages/ArtList'));
const TikTokPage = lazy(() => import('pages/TikTokPage'));

const MusicList = lazy(() => import('pages/MusicList'));
const PhotoPage = lazy(() => import('pages/PhotoPage'));
const BookmarkPage = lazy(() => import('pages/BookmarkPage'));
const YachtsPage = lazy(() => import('pages/YachtsPage'));
const PageEditPage = lazy(() => import('pages/PageEditPage'));
const PagesPage = lazy(() => import('pages/PagesPage'));
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
        {/* <Route element={<MainLayout />} path="react3">
          <Route element={<GenericPage title="Generic Page" />} />
          <Route path="tutorial">
            <Route
              element={<GenericPage id={1} title="React Tutorial" />}
              path="1"
            />
            <Route
              element={<GenericPage id={2} title="Creating A Project" />}
              path="2"
            />
            <Route
              element={<GenericPage id={3} title="Creating A Project" />}
              path="3"
            />
            <Route
              element={<GenericPage id={4} title="Creating A Project" />}
              path="4"
            />
          </Route>
          <Route
            element={<GenericPage id={901} title="Internationalization" />}
            path="internationalization"
          />
        </Route> */}

        {/* IDE */}
        <Route element={<MainLayout />} path="ide">
          <Route
            element={<GenericPage id={2001} title="Chrome Extensions" />}
            path="chrome-extensions"
          />
          <Route element={<GenericPage id={2002} title="GIT" />} path="git" />
          <Route
            element={<GenericPage id={2003} title="Visual Studio Code" />}
            path="vsc"
          />
          <Route
            element={
              <GenericPage id={2004} title="Visual Studio Code: Extensions" />
            }
            path="vsc/extensions"
          />
          <Route
            element={<GenericPage id={54} title="Visual Studio Code: Help" />}
            path="vsc/help"
          />
          <Route element={<GenericPage id={55} title="NPM" />} path="npm" />
          <Route element={<GenericPage id={56} title="Git" />} path="git" />
          <Route
            element={<GenericPage id={57} title="GitHub" />}
            path="github"
          />
          <Route
            element={<GenericPage id={58} title="AWS Commit" />}
            path="aws/commit"
          />
        </Route>

        {/* WEB */}
        <Route element={<MainLayout />} path="web">
          <Route element={<GenericPage id={0} title="HTML" />} path="html" />
        </Route>

        {/* DESIGN */}
        <Route element={<MainLayout />} path="style">
          <Route
            element={<GenericPage id={900} title="CSS Overview" />}
            path="css"
          />
          <Route
            element={<GenericPage id={0} title="Responsive Design" />}
            path="responsive-design"
          />
          <Route
            element={<GenericPage id={0} title="Material Design" />}
            path="material-design"
          />
          <Route
            element={<GenericPage id={0} title="Print Design" />}
            path="print-design"
          />
          <Route
            element={<GenericPage id={0} title="Font Pairing" />}
            path="font-pairing"
          />
          <Route
            element={<GenericPage id={0} title="Parallax Scrolling" />}
            path="parallax-scrolling"
          />
          <Route
            element={<GenericPage id={0} title="Kinetic Typography" />}
            path="kinetic-typography"
          />
          <Route
            element={<GenericPage id={0} title="Microinteractions" />}
            path="microinteractions"
          />
          <Route
            element={<GenericPage id={0} title="CSS New Features" />}
            path="css/new"
          />
          <Route
            element={<GenericPage id={0} title="CSS References" />}
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
            element={<GenericPage id={0} title="Programming" />}
            path="font-pairing"
          />
          <Route element={<GenericPage id={0} title="SOLID" />} path="solid" />
          <Route
            element={<GenericPage id={0} title="Design Patterns" />}
            path="design-patterns"
          />
          <Route
            element={<GenericPage id={0} title="Programming Challenges" />}
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

        {/* Example */}
        <Route path="example">
          <Route element={<GraphGLPage />} path="graphgl" />
        </Route>

        {/* 1 - CSS */}
        <Route element={<MainLayout />} path="css">
          <Route element={<GenericPage />} path="css" />
        </Route>

        {/* 2 - Design  */}
        <Route element={<MainLayout />} path="design">
          <Route
            element={<GenericPage id={1003} title="Corporate Memphis" />}
            path="corporate-memphis-design"
          />
          <Route
            element={<GenericPage id={1002} title="Flat Design" />}
            path="flat-design"
          />
          <Route
            element={<GenericPage id={1004} title="Glassmorphism" />}
            path="glassmorphism"
          />
          <Route
            element={<GenericPage id={1005} title="Minimalism" />}
            path="minimalism"
          />
          <Route
            element={<GenericPage id={1006} title="Neumorphism" />}
            path="neumorphism"
          />
          <Route
            element={<GenericPage id={1007} title="Retrofuturism" />}
            path="retrofuturism"
          />
          <Route
            element={<GenericPage id={1001} title="Skeuomorphism" />}
            path="skeuomorphism"
          />
          <Route
            element={<GenericPage id={1008} title="Swiss Style" />}
            path="swiss-style"
          />
        </Route>

        {/* 3 - Artist */}
        <Route element={<MainLayout />}>
          <Route element={<TikTokPage />} path="artists/:id" />
          <Route element={<TikTokPage />} path="artists" />
        </Route>

        {/* 4 - General */}
        <Route element={<PhotoLayout />} path="general">
          <Route element={<BookmarkPage />} path="bookmarks" />
          <Route element={<PhotoPage />} path="photos" />
        </Route>

        {/* 5 - Cheat Sheets */}
        <Route element={<MainLayout />}>
          <Route
            element={<GenericPage id={0} />}
            path="cheatsheets/:id/:subject"
          />
          <Route element={<GenericPage />} path="cheatsheets/:id" />
          <Route element={<GenericPage />} path="cheatsheets" />
        </Route>

        {/* 6 - React */}
        <Route element={<MainLayout />}>
          <Route element={<GenericPage />} path="react/:id" />
          <Route element={<GenericPage />} path="react" />
        </Route>

        {/* 7 - React Project */}

        {/* 8 - Code Solutions */}

        {/* 9 - Patterns */}

        {/* 10 - Art */}
        <Route element={<MainLayout />} path="art">
          <Route
            element={<GenericPage id={3001} title="At Last - Pleasantville" />}
            path="at-last-pleasantville"
          />
          <Route
            element={<GenericPage id={3002} title="Gallos" />}
            path="gallos"
          />
          <Route
            element={<GenericPage id={3003} title="Shoes on the Danube Bank" />}
            path="shoes-on-the-danube-bank"
          />
          <Route element={<YachtsPage />} path="yachts" />
          <Route
            element={<GenericPage id={5001} title="Puzzles - Lazel" />}
            path="puzzles-lazel"
          />
          <Route
            element={<GenericPage id={5002} title="Puzzles - The Puzzle Lab" />}
            path="puzzles-the-puzzle-lab"
          />
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
