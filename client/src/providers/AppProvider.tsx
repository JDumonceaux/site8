import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import MainErrorFallback from '@components/core/MainErrorFallback';
import RingLoader from '@/components/core/loading-spinner/RingLoader';
import ReduxProvider from './ReduxProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

// Type guard to check if error has a status property
const isClientError = (
  errorValue: unknown,
): errorValue is { status: number } => {
  if (typeof errorValue !== 'object' || errorValue === null) return false;
  const maybeStatus = (errorValue as Record<string, unknown>).status;
  return typeof maybeStatus === 'number';
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
          mutations: {
            // Retry mutations once
            retry: 1,
          },
          queries: {
            // Cache time: how long inactive data stays in cache (10 minutes)
            gcTime: 10 * 60 * 1000,
            // Don't refetch on reconnect by default
            refetchOnReconnect: false,
            // Refetch on window focus for better UX
            refetchOnWindowFocus: true,
            // Retry failed requests 3 times with exponential backoff
            retry: (failureCount, error: unknown) => {
              // Don't retry on 4xx errors (client errors)
              if (isClientError(error)) {
                const { status } = error;
                if (status >= 400 && status < 500) {
                  return false;
                }
              }
              return failureCount < 3;
            },
            // Stale time: how long data stays fresh (5 minutes)
            staleTime: 5 * 60 * 1000,
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
        globalThis.location.reload();
      }}
    >
      <ReduxProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <output
                aria-label="Loading application"
                className="flex items-center justify-center min-h-screen"
              >
                <RingLoader />
                <span className="sr-only">Loading application...</span>
              </output>
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
