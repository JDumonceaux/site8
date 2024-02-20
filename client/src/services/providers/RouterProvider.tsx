import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider as Router,
} from 'react-router-dom';

import { HomeLayout, MainLayout } from '../../pages';
import GenericPage from '../../pages/GenericPage';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import TestGrid from '../../pages/react/TestGrid';
import ProtectedRoute from './ProtectedRoute';

const NotFound = lazy(() => import('../../pages/NotFound'));
const Sitemap = lazy(() => import('../../pages/Sitemap'));

const Artists = lazy(() => import('../../pages/other/Artists'));
const ArtList = lazy(() => import('../../pages/other/ArtList'));
const MusicList = lazy(() => import('../../pages/other/MusicList'));
const PhotoList = lazy(() => import('../../pages/other/PhotoList'));
const ResourcesList = lazy(() => import('../../pages/other/ResourcesList'));
const Yachts = lazy(() => import('../../pages/other/Yachts'));
const PagesList = lazy(() => import('../../pages/other/PagesList'));
const PageEdit = lazy(() => import('../../pages/other/PageEdit'));

const FormExample1 = lazy(() => import('../../pages/examples/FormExample1'));
const FormExample2 = lazy(() => import('../../pages/examples/FormExample2'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<HomeLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="sitemap" element={<Sitemap />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* REACT */}
        <Route path="react" element={<MainLayout />}>
          <Route
            path="1001"
            element={<GenericPage id={1001} pageTitle="Generic Page" />}
          />
          <Route path="tutorial">
            <Route
              path="1"
              element={<GenericPage id={1} pageTitle="React Tutorial" />}
            />
            <Route
              path="2"
              element={<GenericPage id={2} pageTitle="Creating A Project" />}
            />
            <Route
              path="3"
              element={<GenericPage id={3} pageTitle="Creating A Project" />}
            />
            <Route
              path="4"
              element={<GenericPage id={4} pageTitle="Creating A Project" />}
            />
          </Route>
          <Route
            path="internationalization"
            element={<GenericPage id={901} pageTitle="Internationalization" />}
          />
        </Route>

        {/* IDE */}
        <Route path="ide" element={<MainLayout />}>
          <Route
            path="chrome-extensions"
            element={<GenericPage id={2001} pageTitle="Chrome Extensions" />}
          />
          <Route
            path="git"
            element={<GenericPage id={2002} pageTitle="GIT" />}
          />
          <Route
            path="vsc"
            element={<GenericPage id={2003} pageTitle="Visual Studio Code" />}
          />
          <Route
            path="vsc/extensions"
            element={
              <GenericPage
                id={2004}
                pageTitle="Visual Studio Code: Extensions"
              />
            }
          />
          <Route
            path="vsc/help"
            element={
              <GenericPage id={54} pageTitle="Visual Studio Code: Help" />
            }
          />
          <Route path="npm" element={<GenericPage id={55} pageTitle="NPM" />} />
          <Route path="git" element={<GenericPage id={56} pageTitle="Git" />} />
          <Route
            path="github"
            element={<GenericPage id={57} pageTitle="GitHub" />}
          />
          <Route
            path="aws/commit"
            element={<GenericPage id={58} pageTitle="AWS Commit" />}
          />
        </Route>

        {/* WEB */}
        <Route path="web" element={<MainLayout />}>
          <Route
            path="html"
            element={<GenericPage id={0} pageTitle="HTML" />}
          />
        </Route>

        {/* DESIGN */}
        <Route path="design" element={<MainLayout />}>
          <Route
            path="css"
            element={<GenericPage id={900} pageTitle="CSS Overview" />}
          />
          <Route
            path="responsive-design"
            element={<GenericPage id={0} pageTitle="Responsive Design" />}
          />
          <Route
            path="material-design"
            element={<GenericPage id={0} pageTitle="Material Design" />}
          />
          <Route
            path="print-design"
            element={<GenericPage id={0} pageTitle="Print Design" />}
          />
          <Route
            path="font-pairing"
            element={<GenericPage id={0} pageTitle="Font Pairing" />}
          />
          <Route
            path="parallax-scrolling"
            element={<GenericPage id={0} pageTitle="Parallax Scrolling" />}
          />
          <Route
            path="kinetic-typography"
            element={<GenericPage id={0} pageTitle="Kinetic Typography" />}
          />
          <Route
            path="microinteractions"
            element={<GenericPage id={0} pageTitle="Microinteractions" />}
          />
          <Route
            path="css/new"
            element={<GenericPage id={0} pageTitle="CSS New Features" />}
          />
          <Route
            path="css/references"
            element={<GenericPage id={0} pageTitle="CSS References" />}
          />
        </Route>

        {/* TESTING */}
        <Route path="testing" element={<MainLayout />}>
          <Route index element={<TestGrid />} />
        </Route>

        {/* Programming */}
        <Route path="programming" element={<MainLayout />}>
          <Route
            path="font-pairing"
            element={<GenericPage id={0} pageTitle="Programming" />}
          />
          <Route
            path="solid"
            element={<GenericPage id={0} pageTitle="SOLID" />}
          />
          <Route
            path="design-patterns"
            element={<GenericPage id={0} pageTitle="Design Patterns" />}
          />
          <Route
            path="programming-challenges"
            element={<GenericPage id={0} pageTitle="Programming Challenges" />}
          />
        </Route>

        {/* OTHER STUFF */}
        <Route path="other" element={<MainLayout />}>
          <Route path="art">
            <Route index element={<ArtList />} />
            <Route path="kelly-boesh" element={<Artists />} />
            <Route path="shag" element={<Artists />} />
          </Route>
          <Route
            path="at-last"
            element={
              <GenericPage id={3001} pageTitle="At Last - Pleasantville" />
            }
          />
          <Route
            path="gallos"
            element={<GenericPage id={3002} pageTitle="Gallos" />}
          />
          <Route
            path="shoes-on-the-danube-bank"
            element={
              <GenericPage id={3003} pageTitle="Shoes on the Danube Bank" />
            }
          />

          <Route path="photography">
            <Route index element={<PhotoList />} />
          </Route>
          <Route path="resources">
            <Route index element={<ResourcesList />} />
          </Route>
          <Route path="yachts">
            <Route index element={<Yachts />} />
          </Route>
          <Route path="videos">
            <Route index element={<MusicList />} />
            <Route path="you-tube" element={<MusicList />} />
          </Route>
          <Route
            path="puzzles"
            element={<GenericPage id={5001} pageTitle="Puzzles - Lazel" />}
          />
          <Route
            path="puzzles2"
            element={
              <GenericPage id={5002} pageTitle="Puzzles - The Puzzle Lab" />
            }
          />
        </Route>
        {/* ADMIN */}
        <Route path="admin" element={<MainLayout />}>
          <Route path="pages" element={<PagesList />} />
          <Route path="page/edit" element={<PageEdit />} />
          <Route path="page/edit/:id" element={<PageEdit />} />
        </Route>

        {/* STYLES */}
        <Route path="styles" element={<MainLayout />}>
          <Route
            path="corporate-memphis"
            element={<GenericPage id={1003} pageTitle="Corporate Memphis" />}
          />
          <Route
            path="flat-design"
            element={<GenericPage id={1002} pageTitle="Flat Design" />}
          />
          <Route
            path="glassmorphism"
            element={<GenericPage id={1004} pageTitle="Glassmorphism" />}
          />
          <Route
            path="minimalism"
            element={<GenericPage id={1005} pageTitle="Minimalism" />}
          />
          <Route
            path="neumorphism"
            element={<GenericPage id={1006} pageTitle="Neumorphism" />}
          />
          <Route
            path="retrofuturism"
            element={<GenericPage id={1007} pageTitle="Retrofuturism" />}
          />
          <Route
            path="skeuomorphism"
            element={<GenericPage id={1001} pageTitle="Skeuomorphism" />}
          />
          <Route
            path="swiss-style"
            element={<GenericPage id={1008} pageTitle="Swiss Style" />}
          />
        </Route>

        {/* EXAMPLES */}
        <Route path="examples" element={<MainLayout />}>
          <Route path="form/1" element={<FormExample1 />} />
          <Route path="form/2" element={<FormExample2 />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export const RouterProvider = () => {
  return <Router router={router} />;
};
