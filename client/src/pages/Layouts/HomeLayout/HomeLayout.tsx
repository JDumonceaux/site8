import ErrorBoundary from 'components/common/ErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function HomeLayout(): JSX.Element {
  return (
    <ErrorBoundary fallback="Error">
      <Suspense fallback="Loading ...">
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
