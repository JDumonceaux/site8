import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { ReduxProvider } from './services/providers/ReduxProvider.tsx';
import { RouterProvider } from './services/providers/RouterProvider.tsx';
import { HelmetProvider } from 'react-helmet-async';
import './reset.css';
import './main.css';
import './i18.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <HelmetProvider>
        <RouterProvider />
      </HelmetProvider>
    </ReduxProvider>
  </React.StrictMode>
);
reportWebVitals(console.log);
