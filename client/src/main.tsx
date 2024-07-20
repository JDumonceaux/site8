import './styles/main.css';
import './styles/reset.css';
import './utils/i18';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { ReduxProvider } from './providers/ReduxProvider';
import { RouterProvider } from './providers/RouterProvider';
import reportWebVitals from './utils/reportWebVitals';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <HelmetProvider>
        <RouterProvider />
      </HelmetProvider>
    </ReduxProvider>
  </React.StrictMode>,
);

reportWebVitals(console.log);
