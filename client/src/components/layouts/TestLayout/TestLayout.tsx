import AppInitializer from 'components/common/AppInitializer/AppInitializer';
import Header from 'components/ui/Header/Header';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

const TestLayout = (): JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppInitializer />
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

export default TestLayout;
