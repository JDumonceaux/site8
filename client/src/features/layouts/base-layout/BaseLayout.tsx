import { type JSX, memo, type ReactNode, Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import {
  ErrorFallback,
  LoadingFallback,
} from '@features/layouts/common/LayoutFallbacks';
import Layout from '@features/layouts/layout/Layout';

type BaseLayoutProps = {
  /** Optional header component to render above main content */
  readonly header?: ReactNode;
  /** Optional initializer component (e.g., AppInitializer) */
  readonly initializer?: ReactNode;
};

/**
 * Base layout component that provides common structure for all layout variants.
 * Includes error boundary, suspense, and optional header/initializer.
 *
 * @example
 * // Simple layout with just header
 * <BaseLayout header={<Header />} />
 *
 * @example
 * // Full layout with initializer and header
 * <BaseLayout
 *   initializer={<AppInitializer />}
 *   header={<Header avatar={<Avatar />} />}
 * />
 */
const BaseLayout = ({ header, initializer }: BaseLayoutProps): JSX.Element => {
  const loadingFallback = useMemo(() => <LoadingFallback />, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {initializer}
      {header}
      <Layout.Main>
        <Suspense fallback={loadingFallback}>
          <Outlet />
        </Suspense>
      </Layout.Main>
    </ErrorBoundary>
  );
};

BaseLayout.displayName = 'BaseLayout';
export default memo(BaseLayout);
