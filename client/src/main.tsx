import './lib/utils/i18';
import './styles/main.css';
import './styles/reset.css';

import ReduxProvider from 'providers/ReduxProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import reportWebVitals from './lib/utils/reportWebVitals';
import { RouterProvider } from './providers/RouterProvider';
// import { Amplify } from 'aws-amplify';
// import config from './amplifyconfiguration.json';
// Amplify.configure(config);

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
