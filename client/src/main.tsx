import React from "react";
import ReactDOM from "react-dom/client";

import { ReduxProvider } from "./services/providers/ReduxProvider.tsx";
import { RouterProvider } from "./services/providers/RouterProvider.tsx";
import "./reset.css";
import "./main.css";
import "./i18.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <RouterProvider />
    </ReduxProvider>
  </React.StrictMode>
);
