import './mainLayout.css';

import { Footer, Header, MainMenu } from 'components/common';
import ErrorBoundary from 'components/common/ErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function MainLayout(): JSX.Element {
  return (
    <ErrorBoundary fallback="Error">
      <div className="main-layout">
        <Header />
        <Suspense fallback="Loading ...">
          <Outlet />
        </Suspense>
        <MainMenu />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
