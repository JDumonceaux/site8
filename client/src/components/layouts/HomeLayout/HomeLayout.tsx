import { Suspense } from 'react';

import AppInitializer from 'components/core/AppInitializer/AppInitializer';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

const HomeLayout = (): React.JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppInitializer />
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

export default HomeLayout;
