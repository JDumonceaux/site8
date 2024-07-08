import './styles/main.css';
import './styles/reset.css';
import './utils/i18';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { ReduxProvider } from './providers/ReduxProvider';
import { RouterProvider } from './providers/RouterProvider';
import reportWebVitals from './utils/reportWebVitals';
// import { Amplify } from 'aws-amplify';
// import config from './amplifyconfiguration.json';
import { ApolloProvider } from './providers/ApolloProvider';
// Amplify.configure(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider>
      <ReduxProvider>
        <HelmetProvider>
          <RouterProvider />
        </HelmetProvider>
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>,
);

reportWebVitals(console.log);
