import { type JSX, memo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import Avatar from '@components/core/avatar/Avatar';
import Header from '@components/core/header/Header';
import AppInitializer from '@features/app/app-initializer/AppInitializer';
import {
  ErrorFallback,
  LoadingFallback,
} from '@features/layouts/common/LayoutFallbacks';
import Layout from '@features/layouts/layout/Layout';

/**
 * Layout wrapper for general application pages.
 * Provides error boundary, app initialization, header with avatar, and suspense for lazy-loaded routes.
 */
const GenericLayout = (): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AppInitializer />
    <Header
      avatar={
        <Avatar
          alt="User avatar"
          id="avatar"
          src="/avatar.jpg"
        >
          JD
        </Avatar>
      }
    />
    <Layout.Main>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </Layout.Main>
  </ErrorBoundary>
);

GenericLayout.displayName = 'GenericLayout';
export default memo(GenericLayout);
