import { Suspense } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainErrorFallback } from 'components/errors/MainErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';

import ReduxProvider from './ReduxProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

// Create a Query Client for react-query
const queryClient = new QueryClient();

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <ReduxProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
