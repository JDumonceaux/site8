import ErrorBoundary from 'components/common/ErrorBoundary';
import { Footer1 } from 'components/common/Footer/Footer1';
import { Header1 } from 'components/common/Header/Header1';

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function Home2Layout(): JSX.Element {
  return (
    <ErrorBoundary fallback="Error">
      <div className="home-layout">
        <Header1 />
        <Suspense fallback="Loading ...">
          <Outlet />
        </Suspense>
        <Footer1 />
      </div>
    </ErrorBoundary>
  );
}
