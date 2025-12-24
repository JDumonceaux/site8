import { type JSX, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import AppInitializer from '@features/app/app-initializer/AppInitializer';
import {
  ErrorFallback,
  LoadingFallback,
} from '@features/layouts/common/LayoutFallbacks';
import Layout from '@features/layouts/layout/Layout';

/**
 * Layout wrapper for the home (root) routes.
 */
const HomeLayout = (): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AppInitializer />
    <Layout.Main>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </Layout.Main>
  </ErrorBoundary>
);

HomeLayout.displayName = 'HomeLayout';
export default HomeLayout;
