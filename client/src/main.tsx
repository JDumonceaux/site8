import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ReduxProvider } from "./services/providers/ReduxProvider.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppSetup from "./components/common/AppSetup/AppSetup.tsx";
import "./main.css";

import ArtList from "./pages/other/ArtList.tsx";
import Blog from "./pages/other/Blog.tsx";
import BookList from "./pages/other/BookList.tsx";
import Home from "./pages/Home.tsx";
import NewBook from "./pages/NewBook.tsx";
import NotFound from "./pages/NotFound.tsx";
import MusicList from "./pages/other/MusicList.tsx";
import PhotoList from "./pages/other/PhotoList.tsx";
import LearnCss from "./pages/programming/LearnCss.tsx";
import LearnGit from "./pages/programming/LearnGit.tsx";
import LearnHtml from "./pages/programming/LearnHtml.tsx";
import LearnReact from "./pages/programming/LearnReact.tsx";
import VisualStudioCode from "./pages/programming/VisualStudioCode.tsx";
import DefaultPageLayout from "./pages/Layouts/DefaultPageLayout/DefaultPageLayout.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultPageLayout />}>
      <Route index element={<Home />} />
      <Route path="/react">
        <Route index element={<LearnReact />} />
        <Route path="/react/vss" element={<VisualStudioCode />} />
        <Route path="/react/git" element={<LearnGit />} />
        <Route path="/react/html" element={<LearnHtml />} />
        <Route path="/react/css" element={<LearnCss />} />
      </Route>
      <Route path="/art">
        <Route index element={<ArtList />} />
      </Route>
      <Route path="/books">
        <Route index element={<BookList />} />
        <Route path="new" element={<NewBook />} />
      </Route>
      <Route path="/music">
        <Route index element={<MusicList />} />
      </Route>
      <Route path="/photography">
        <Route index element={<PhotoList />} />
      </Route>
      <Route path="/blog">
        <Route index element={<Blog />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <ReduxProvider>
        <>
          <AppSetup />
          <App />
        </>
      </ReduxProvider>
    </RouterProvider>
  </React.StrictMode>
);
