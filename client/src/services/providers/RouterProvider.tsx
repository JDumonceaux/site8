import {
  Route,
  RouterProvider as Router,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from '../../pages/Home';
import MainLayout from '../../pages/Layouts/MainLayout/MainLayout';
import GenericPage from '../../pages/GenericPage';
import TestGrid from '../../pages/react/TestGrid';

import { lazy } from 'react';

const NotFound = lazy(() => import('../../pages/NotFound'));
const Sitemap = lazy(() => import('../../pages/Sitemap'));

const Artists = lazy(() => import('../../pages/other/Artists'));
const ArtList = lazy(() => import('../../pages/other/ArtList'));
const MusicList = lazy(() => import('../../pages/other/MusicList'));
const PhotoList = lazy(() => import('../../pages/other/PhotoList'));
const ResourcesList = lazy(() => import('../../pages/other/ResourcesList'));
const Yachts = lazy(() => import('../../pages/other/Yachts'));

const FormExample1 = lazy(() => import('../../pages/examples/FormExample1'));
const FormExample2 = lazy(() => import('../../pages/examples/FormExample2'));

const ImageLinkExample = lazy(
  () => import('../../pages/examples/ImageLinkExample')
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* REACT */}
      <Route path='react' element={<MainLayout />}>
        <Route
          path='1001'
          element={<GenericPage id={1001} pageTitle='Generic Page' />}
        />
        <Route path='tutorial'>
          <Route
            path='1'
            element={<GenericPage id={1} pageTitle='React Tutorial' />}
          />
          <Route
            path='2'
            element={<GenericPage id={2} pageTitle='Creating A Project' />}
          />
          <Route
            path='3'
            element={<GenericPage id={3} pageTitle='Creating A Project' />}
          />
          <Route
            path='4'
            element={<GenericPage id={4} pageTitle='Creating A Project' />}
          />
        </Route>
        <Route
          path='internationalization'
          element={<GenericPage id={901} pageTitle='Internationalization' />}
        />
      </Route>

      {/* IDE */}
      <Route path='ide' element={<MainLayout />}>
        <Route
          path='chrome'
          element={<GenericPage id={51} pageTitle='Chrome' />}
        />
        <Route
          path='vsc'
          element={<GenericPage id={52} pageTitle='Visual Studio Code' />}
        />
        <Route
          path='vsc/extensions'
          element={
            <GenericPage id={53} pageTitle='Visual Studio Code: Extensions' />
          }
        />
        <Route
          path='vsc/help'
          element={<GenericPage id={54} pageTitle='Visual Studio Code: Help' />}
        />
        <Route path='npm' element={<GenericPage id={55} pageTitle='NPM' />} />
        <Route path='git' element={<GenericPage id={56} pageTitle='Git' />} />
        <Route
          path='github'
          element={<GenericPage id={57} pageTitle='GitHub' />}
        />
        <Route
          path='aws/commit'
          element={<GenericPage id={58} pageTitle='AWS Commit' />}
        />
      </Route>

      {/* WEB */}
      <Route path='web' element={<MainLayout />}>
        <Route path='html' element={<GenericPage id={0} pageTitle='HTML' />} />
      </Route>

      {/* DESIGN */}
      <Route path='design' element={<MainLayout />}>
        <Route
          path='css'
          element={<GenericPage id={900} pageTitle='CSS Overview' />}
        />
        <Route
          path='responsive-design'
          element={<GenericPage id={0} pageTitle='Responsive Design' />}
        />
        <Route
          path='material-design'
          element={<GenericPage id={0} pageTitle='Material Design' />}
        />
        <Route
          path='print-design'
          element={<GenericPage id={0} pageTitle='Print Design' />}
        />
        <Route
          path='font-pairing'
          element={<GenericPage id={0} pageTitle='Font Pairing' />}
        />
        <Route
          path='parallax-scrolling'
          element={<GenericPage id={0} pageTitle='Parallax Scrolling' />}
        />
        <Route
          path='kinetic-typography'
          element={<GenericPage id={0} pageTitle='Kinetic Typography' />}
        />
        <Route
          path='microinteractions'
          element={<GenericPage id={0} pageTitle='Microinteractions' />}
        />
        <Route
          path='css/new'
          element={<GenericPage id={0} pageTitle='CSS New Features' />}
        />
        <Route
          path='css/references'
          element={<GenericPage id={0} pageTitle='CSS References' />}
        />
      </Route>

      {/* TESTING */}
      <Route path='testing' element={<MainLayout />}>
        <Route index element={<TestGrid />} />
      </Route>

      {/* Programming */}
      <Route path='programming' element={<MainLayout />}>
        <Route
          path='font-pairing'
          element={<GenericPage id={0} pageTitle='Programming' />}
        />
        <Route
          path='solid'
          element={<GenericPage id={0} pageTitle='SOLID' />}
        />
        <Route
          path='design-patterns'
          element={<GenericPage id={0} pageTitle='Design Patterns' />}
        />
        <Route
          path='programming-challenges'
          element={<GenericPage id={0} pageTitle='Programming Challenges' />}
        />
      </Route>

      {/* OTHER STUFF */}
      <Route path='other' element={<MainLayout />}>
        <Route path='art'>
          <Route index element={<ArtList />} />
          <Route path='kelly-boesh' element={<Artists />} />
          <Route path='shag' element={<Artists />} />
        </Route>

        <Route path='photography'>
          <Route index element={<PhotoList />} />
        </Route>
        <Route path='resources'>
          <Route index element={<ResourcesList />} />
        </Route>
        <Route path='yachts'>
          <Route index element={<Yachts />} />
        </Route>
        <Route path='videos'>
          <Route index element={<MusicList />} />
          <Route path='you-tube' element={<MusicList />} />
        </Route>
      </Route>

      {/* STYLES */}
      <Route path='styles' element={<MainLayout />}>
        <Route
          path='corporate-memphis'
          element={<GenericPage id={1003} pageTitle='Corporate Memphis' />}
        />
        <Route
          path='flat-design'
          element={<GenericPage id={1002} pageTitle='Flat Design' />}
        />
        <Route
          path='glassmorphism'
          element={<GenericPage id={1004} pageTitle='Glassmorphism' />}
        />
        <Route
          path='minimalism'
          element={<GenericPage id={1005} pageTitle='Minimalism' />}
        />
        <Route
          path='neumorphism'
          element={<GenericPage id={1006} pageTitle='Neumorphism' />}
        />
        <Route
          path='retrofuturism'
          element={<GenericPage id={1007} pageTitle='Retrofuturism' />}
        />
        <Route
          path='skeuomorphism'
          element={<GenericPage id={1001} pageTitle='Skeuomorphism' />}
        />
        <Route
          path='swiss-style'
          element={<GenericPage id={1008} pageTitle='Swiss Style' />}
        />
      </Route>

      {/* EXAMPLES */}
      <Route path='examples' element={<MainLayout />}>
        <Route path='form/1' element={<FormExample1 />} />
        <Route path='form/2' element={<FormExample2 />} />
        <Route path='buttons' element={<ImageLinkExample />} />
      </Route>

      <Route path='sitemap' element={<Sitemap />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

export const RouterProvider = () => {
  return <Router router={router} />;
};
