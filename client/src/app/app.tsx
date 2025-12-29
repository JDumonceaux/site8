import { type JSX, lazy, Suspense } from 'react';

import AppProvider from '@providers/AppProvider';
import { usePreloadResources } from './usePreloadResources';

// Lazy‐load the router for code-splitting
const AppRouter = lazy(async () => import('./RouterProvider'));

/**
 * Root application component
 */
const App = (): JSX.Element => {
  usePreloadResources();

  return (
    <AppProvider>
      <Suspense
        fallback={<output aria-live="polite">Loading application…</output>}
      >
        <AppRouter />
      </Suspense>
    </AppProvider>
  );
};

export default App;
