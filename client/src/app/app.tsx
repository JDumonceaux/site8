import { AppProvider } from 'providers/AppProvider';
import AppRouter from 'providers/RouterProvider';
// import { preload } from 'react-dom';

export const App = () => {
  // preload('/lib/utils/i18', { as: 'script' });
  // preload('/styles/reset.css', { as: 'style', fetchPriority: 'low' });
  // preload('/styles/main.css', { as: 'style', fetchPriority: 'high' });

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
