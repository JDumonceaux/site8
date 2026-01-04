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
const BookmarkPage = lazy(
  async () => import('../../features/bookmarks/BookmarkPage'),
);
const TravelPage = lazy(async () => import('../../features/travel/TravelPage'));
const ImagesPage = lazy(async () => import('../../features/images/ImagesPage'));
const GenericPage = lazy(
  async () => import('../../features/generic/GenericPage'),
);
const GenericImagePage = lazy(
  async () => import('../../features/generic/GenericImagePage'),
);
const PhotoPage = lazy(async () => import('../../features/photos/PhotoPage'));
const TikTokPage = lazy(async () => import('../../features/tiktok/TikTokPage'));
const YachtsPage = lazy(async () => import('../../features/yatch/YachtsPage'));
const TestsPage = lazy(async () => import('../../features/tests/TestsPage'));
const TestsAiPage = lazy(
  async () => import('../../features/tests/TestsAiPage'),
);
const MusicPage = lazy(async () => import('../../features/music/MusicPage'));

/**
 * Protected content routes that require authentication
 * Includes generic pages, fun section, design tools, music, bookmarks, travel, and testing
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
      <Route
        element={<GenericPage />}
        path="accessibility/*"
      />
      <Route
        element={<GenericPage />}
        path="aws/*"
      />
      <Route
        element={<GenericPage />}
        path="code-snippets/*"
      />
      <Route
        element={<GenericPage />}
        path="design/*"
      />
      <Route
        element={<GenericPage />}
        path="html/*"
      />
      <Route
        element={<GenericPage />}
        path="interview-questions/*"
      />
      <Route
        element={<GenericPage />}
        path="javascript/*"
      />
      <Route
        element={<GenericPage />}
        path="management/*"
      />
      <Route
        element={<GenericPage />}
        path="nextjs/*"
      />
      <Route
        element={<GenericPage />}
        path="nodejs/*"
      />
      <Route
        element={<GenericPage />}
        path="programming/*"
      />
      <Route
        element={<GenericPage />}
        path=":lang?/programming/*"
      />
      <Route
        element={<GenericPage />}
        path="python/*"
      />
      <Route
        element={<GenericPage />}
        path="react/*"
      />
      <Route
        element={<GenericPage />}
        path="react-a-z/*"
      />
      <Route
        element={<GenericPage />}
        path="typescript/*"
      />
      <Route
        element={<GenericPage />}
        path="web/*"
      />

      <Route
        element={<TikTokPage />}
        path="tiktok"
      />
      <Route
        element={<YachtsPage />}
        path="yachts"
      />
      <Route
        element={<GenericImagePage />}
        path="images"
      />
      <Route element={<UnifiedLayout hasInitializer />}>
        <Route
          element={<PhotoPage />}
          path="photos"
        />
      </Route>
      <Route
        element={<GenericPage />}
        path="*"
      />
    </Route>

    {/* Music */}
    <Route
      element={
        <UnifiedLayout
          hasAvatar
          hasHeader
          hasInitializer
        />
      }
      path="music"
    >
      <Route
        element={<MusicPage />}
        index
      />
    </Route>

    {/* Bookmarks */}
    <Route
      element={
        <UnifiedLayout
          hasAvatar
          hasHeader
          hasInitializer
        />
      }
      path="bookmarks"
    >
      <Route
        element={<BookmarkPage />}
        index
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

    {/* Images Gallery */}
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
        element={<ImagesPage />}
        index
        path="images"
      />
      <Route
        element={<ImagesPage />}
        path="images/:folder"
      />
      <Route
        element={<ImagesPage />}
        path="images/tag/:tag"
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
        path="react/testing/test-grid"
      />
      <Route
        element={<TestsAiPage />}
        path="tests/ai"
      />
    </Route>
  </Route>
);
