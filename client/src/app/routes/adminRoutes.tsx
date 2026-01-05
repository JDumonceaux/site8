import { lazy } from 'react';
import { Route } from 'react-router-dom';

import type { QueryClient } from '@tanstack/react-query';
import { pageLoader } from '../../features/page-edit/pagePrefetch';
import ProtectedRoute from '../providers/ProtectedRoute';

// ---------------------
// Layout
// ---------------------
const UnifiedLayout = lazy(
  async () => import('../../features/layouts/unified-layout/UnifiedLayout'),
);

// ---------------------
// Admin Pages
// ---------------------
const ImageEditPage = lazy(
  async () => import('../../features/image-edit/ImageEditPage'),
);
const ImagesEditPage = lazy(
  async () => import('../../features/images-edit/ImagesEditPage'),
);
const PageEditPage = lazy(
  async () => import('../../features/page-edit/PageEditPage'),
);
const PagesEditPage = lazy(
  async () => import('../../features/pages-edit/PagesEditPage'),
);
const TestsEditPage = lazy(
  async () => import('../../features/tests/TestsEditPage'),
);

/**
 * Admin routes that require authentication and admin role
 * Includes page editing, image management, item management, and development tools
 */
export const adminRoutes = (queryClient: QueryClient) => (
  <Route element={<ProtectedRoute />}>
    <Route
      element={
        <UnifiedLayout
          hasAvatar
          hasHeader
          hasInitializer
        />
      }
      path="admin"
    >
      <Route
        element={<PagesEditPage />}
        path="pages"
      />
      <Route
        element={<PageEditPage />}
        path="page/edit"
      />
      <Route
        element={<PageEditPage />}
        loader={pageLoader(queryClient)}
        path="page/edit/:id"
      />
      <Route
        element={<ImageEditPage />}
        path="image/edit"
      />
      <Route
        element={<ImageEditPage />}
        path="image/edit/:id"
      />
      <Route
        element={<ImagesEditPage />}
        path="images"
      />
      <Route
        element={<ImagesEditPage />}
        path="images/new"
      />
      <Route
        element={<ImagesEditPage />}
        path="images/edit"
      />
      <Route
        element={<TestsEditPage />}
        path="tests/edit"
      />
    </Route>
  </Route>
);
