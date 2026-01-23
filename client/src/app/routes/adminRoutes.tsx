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
const PageEditPage = lazy(
  async () => import('../../features/page-edit/PageEditPage'),
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
        element={<PageEditPage />}
        path="page/edit"
      />
      <Route
        element={<PageEditPage />}
        loader={pageLoader(queryClient)}
        path="page/edit/:id"
      />
    </Route>
  </Route>
);
