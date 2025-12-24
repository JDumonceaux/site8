import { type JSX, memo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import Header from '@components/core/header/Header';
import {
  ErrorFallback,
  LoadingFallback,
} from '@features/layouts/common/LayoutFallbacks';
import Layout from '@features/layouts/layout/Layout';

/**
 * Layout wrapper for authentication-related routes.
 * Provides error boundary and suspense for lazy-loaded routes.
 */
const AuthLayout = (): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Header />
    <Layout.Main>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </Layout.Main>
  </ErrorBoundary>
);

AuthLayout.displayName = 'AuthLayout';
export default memo(AuthLayout);
