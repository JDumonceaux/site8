import AppSetup from 'components/common/AppSetup/AppSetup';
import ErrorBoundary from 'components/common/ErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const HomeLayout = (): JSX.Element => (
  <ErrorBoundary fallback="Error">
    <AppSetup />
    <div>
      <Suspense fallback="Loading ...">
        <Outlet />
      </Suspense>
    </div>
  </ErrorBoundary>
);

export default HomeLayout;
