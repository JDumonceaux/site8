import { lazy } from 'react';
import { Route } from 'react-router-dom';

import ProtectedRoute from '../providers/ProtectedRoute';

// ---------------------
// Layouts
// ---------------------
const UnifiedLayout = lazy(
  async () => import('../../features/layouts/unified-layout/UnifiedLayout'),
);

// ---------------------
// Content Pages
// ---------------------
const TravelPage = lazy(async () => import('../../features/travel/TravelPage'));
const ImagesPage = lazy(async () => import('../../features/images/ImagesPage'));
const GenericPage = lazy(
  async () => import('../../features/generic/GenericPage'),
);
const YachtsPage = lazy(async () => import('../../features/yatch/YachtsPage'));
const TestsPage = lazy(async () => import('../../features/tests/TestsPage'));

const GENERIC_CONTENT_PATHS = [
  'accessibility',
  'aws',
  'code-snippets',
  'design',
  'html',
  'interview-questions',
  'javascript',
  'management',
  'nextjs',
  'nodejs',
  'programming',
  ':lang?/programming',
  'python',
  'react',
  'react-a-z',
  'typescript',
  'web',
] as const;

const TRAVEL_PATHS = [
  ':country',
  ':country/:city',
  ':country/:city/:item',
] as const;

const protectedLayoutElement = (
  <UnifiedLayout
    hasAvatar
    hasHeader
    hasInitializer
  />
);

/**
 * Protected content routes that require authentication
 * Includes generic pages, fun section, design tools, travel, and testing
 */
export const protectedContentRoutes = (
  <Route element={<ProtectedRoute />}>
    {/* Content Routes */}
    <Route element={protectedLayoutElement}>
      {GENERIC_CONTENT_PATHS.map((path) => (
        <Route
          key={path}
          path={path}
        >
          <Route
            element={<GenericPage />}
            path="*"
          />
        </Route>
      ))}
      <Route
        element={<YachtsPage />}
        path="yachts"
      />
      <Route
        element={<GenericPage />}
        path="*"
      />
    </Route>
    {/* Travel */}
    <Route
      element={protectedLayoutElement}
      path="travel"
    >
      <Route
        element={<TravelPage />}
        index
      />
      {TRAVEL_PATHS.map((path) => (
        <Route
          element={<TravelPage />}
          key={path}
          path={path}
        />
      ))}
    </Route>
    <Route element={protectedLayoutElement}>
      <Route
        element={<ImagesPage />}
        path="images"
      />
    </Route>
    {/* Testing */}
    <Route element={protectedLayoutElement}>
      <Route
        element={<TestsPage />}
        path="tests"
      />
    </Route>
  </Route>
);
