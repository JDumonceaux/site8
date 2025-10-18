import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainErrorFallback from '@components/core/MainErrorFallback';
import LoadingSpinner from '@components/core/LoadingSpinner'; // Assuming you have this
import ReduxProvider from './ReduxProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * Main application provider that wraps the app with all necessary context providers.
 * Includes error boundaries, loading states, React Query, and Redux setup.
 */
const AppProvider = ({ children }: AppProviderProps) => {
  // Create QueryClient with optimized configuration
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: how long data stays fresh (5 minutes)
            staleTime: 5 * 60 * 1000,
            // Cache time: how long inactive data stays in cache (10 minutes)
            gcTime: 10 * 60 * 1000,
            // Retry failed requests 3 times with exponential backoff
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors (client errors)
              if (error instanceof Error && 'status' in error) {
                const status = (error as any).status;
                if (status >= 400 && status < 500) {
                  return false;
                }
              }
              return failureCount < 3;
            },
            // Refetch on window focus for better UX
            refetchOnWindowFocus: true,
            // Don't refetch on reconnect by default
            refetchOnReconnect: false,
          },
          mutations: {
            // Retry mutations once
            retry: 1,
          },
        },
      }),
    [],
  );

  return (
    <ErrorBoundary
      FallbackComponent={MainErrorFallback}
      onError={(error, errorInfo) => {
        // Log errors for monitoring (replace with your error reporting service)
        console.error('Application Error:', error, errorInfo);

        // You could send to error reporting service here:
        // errorReportingService.captureException(error, { extra: errorInfo });
      }}
      onReset={() => {
        // Optional: Clear any application state on error reset
        // This could include clearing localStorage, resetting Redux, etc.
        window.location.reload();
      }}
    >
      <ReduxProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div
                className="flex items-center justify-center min-h-screen"
                role="status"
                aria-label="Loading application"
              >
                <RingLoader />
                <span className="sr-only">Loading application...</span>
              </div>
            }
          >
            {children}
          </Suspense>
        </QueryClientProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;
