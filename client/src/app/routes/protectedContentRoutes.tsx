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
const GenericPage = lazy(
  async () => import('../../features/generic/GenericPage'),
);
const YachtsPage = lazy(async () => import('../../features/yatch/YachtsPage'));
const TestsPage = lazy(async () => import('../../features/tests/TestsPage'));

/**
 * Protected content routes that require authentication
 * Includes generic pages, fun section, design tools, travel, and testing
 */
export const protectedContentRoutes = (
  <Route element={<ProtectedRoute />}>
    {/* Content Routes */}
    <Route
      element={
        <UnifiedLayout
          hasAvatar
          hasHeader
          hasInitializer
        />
      }
    >
      <Route path="accessibility">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="aws">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="code-snippets">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="design">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="html">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="interview-questions">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="javascript">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="management">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="nextjs">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="nodejs">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="programming">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path=":lang?/programming">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="python">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="react">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="react-a-z">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="typescript">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
      <Route path="web">
        <Route
          element={<GenericPage />}
          path="*"
        />
      </Route>
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
      element={
        <UnifiedLayout
          hasAvatar
          hasHeader
          hasInitializer
        />
      }
      path="travel"
    >
      <Route
        element={<TravelPage />}
        index
      />
      <Route
        element={<TravelPage />}
        path=":country"
      />
      <Route
        element={<TravelPage />}
        path=":country/:city"
      />
      <Route
        element={<TravelPage />}
        path=":country/:city/:item"
      />
    </Route>
    {/* Testing */}
    <Route
      element={
        <UnifiedLayout
          hasAvatar
          hasHeader
          hasInitializer
        />
      }
    >
      <Route
        element={<TestsPage />}
        path="tests"
      />
    </Route>
  </Route>
);
