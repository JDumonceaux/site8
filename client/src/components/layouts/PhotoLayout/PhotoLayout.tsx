import AppInitializer from 'components/common/AppInitializer/AppInitializer';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

export const PhotoLayout = (): JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppInitializer />
    <Suspense fallback="Loading ...">
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

export default PhotoLayout;