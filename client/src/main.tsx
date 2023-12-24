import React from "react";
import ReactDOM from "react-dom/client";

import { ReduxProvider } from "./services/providers/ReduxProvider.tsx";
import { RouterProvider } from "./services/providers/RouterProvider.tsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <RouterProvider />
    </ReduxProvider>
  </React.StrictMode>
);
