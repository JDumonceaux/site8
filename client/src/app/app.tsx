import { type JSX, lazy, StrictMode, Suspense } from 'react';

import AppProvider from '@providers/AppProvider';
import { usePreloadResources } from './usePreloadResources';

// Lazy‐load the router for code-splitting
const AppRouter = lazy(async () => import('@providers/RouterProvider'));

/**
 * Root application component
 */
const App = (): JSX.Element => {
  usePreloadResources();

  return (
    <StrictMode>
      <AppProvider>
        <Suspense
          fallback={<output aria-live="polite">Loading application…</output>}
        >
          <AppRouter />
        </Suspense>
      </AppProvider>
    </StrictMode>
  );
};

export default App;
