import type { JSX, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';

import { logError } from '@lib/utils/errorHandler';
import FeatureErrorFallback from './FeatureErrorFallback';

type ErrorBoundaryProps = {
  readonly children: ReactNode;
  readonly FallbackComponent?: (props: FallbackProps) => JSX.Element;
  readonly name?: string;
  readonly onError?: (
    error: unknown,
    info: { componentStack?: null | string },
  ) => void;
};

const ErrorBoundary = ({
  children,
  FallbackComponent = FeatureErrorFallback,
  name = 'ErrorBoundary',
  onError,
}: ErrorBoundaryProps): JSX.Element => {
  const handleError = (
    error: unknown,
    info: { componentStack?: null | string },
  ): void => {
    logError(error, {
      componentName: name,
      componentStack: info.componentStack,
    });

    onError?.(error, info);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

ErrorBoundary.displayName = 'ErrorBoundary';
export default ErrorBoundary;
