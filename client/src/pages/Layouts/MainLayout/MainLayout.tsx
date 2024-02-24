import { styled } from 'styled-components';

import ErrorBoundary from 'components/common/ErrorBoundary';
import { Snackbar } from 'components/common/Snackbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer1 } from 'components/common/Footer/Footer1';
import { Header1 } from 'components/common/Header/Header1';
import { MainMenu } from 'components/common/MainMenu';

export default function MainLayout(): JSX.Element {
  return (
    <ErrorBoundary fallback="Error">
      <Header1 />
      <LayoutDiv>
        <Suspense fallback="Loading ...">
          <Outlet />
        </Suspense>
        <Snackbar />
        <MainMenu />
        <Footer1 />
      </LayoutDiv>
    </ErrorBoundary>
  );
}

const LayoutDiv = styled.div`
  max-width: 1920px;
  margin-inline: auto;
  min-height: 100vh;
  min-height: 100dvh;
  margin-top: 50px;
  display: grid;
  grid-template-areas:
    'main-content'
    'left-sidebar'
    'right-sidebar'
    'footer';
  .main-content {
    grid-area: main-content;
    padding: 0 16px;
    margin-bottom: 16px;
  }
  .left-sidebar {
    grid-area: left-sidebar;
  }
  .right-sidebar {
    grid-area: right-sidebar;
    padding: 0 16px;
  }
  .footer {
    grid-area: footer;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'left-sidebar main-content main-content right-sidebar'
      'footer footer  footer  footer';
  }
`;
