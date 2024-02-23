import ErrorBoundary from 'components/common/ErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

export default function HomeLayout(): JSX.Element {
  return (
    <ErrorBoundary fallback="Error">
      <LayoutDiv>
        <Suspense fallback="Loading ...">
          <Outlet />
        </Suspense>
      </LayoutDiv>
    </ErrorBoundary>
  );
}

const LayoutDiv = styled.div``;
