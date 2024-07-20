import AppInitializer from 'components/common/AppInitializer/AppInitializer';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

export const HomeLayout = (): JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppInitializer />
    <div>
      <Suspense fallback="Loading ...">
        <Outlet />
      </Suspense>
    </div>
  </ErrorBoundary>
);

export default HomeLayout;
