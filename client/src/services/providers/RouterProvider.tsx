import {
  Route,
  RouterProvider as Router,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../../pages/Home.tsx";
import DefaultPageLayout from "../../pages/Layouts/DefaultPageLayout/DefaultPageLayout.tsx";
import NewBook from "../../pages/NewBook.tsx";
import NotFound from "../../pages/NotFound.tsx";
import ArtList from "../../pages/other/ArtList.tsx";
import Blog from "../../pages/other/Blog.tsx";
import BookList from "../../pages/other/BookList.tsx";
import MusicList from "../../pages/other/MusicList.tsx";
import PhotoList from "../../pages/other/PhotoList.tsx";
import LearnCss from "../../pages/react/LearnCss.tsx";
import LearnGit from "../../pages/react/LearnGit.tsx";
import LearnHtml from "../../pages/react/LearnHtml.tsx";
import LearnReact from "../../pages/react/LearnReact.tsx";
import LearnIntl from "../../pages/react/LearnIntl.tsx";
import VisualStudioCode from "../../pages/react/VisualStudioCode.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultPageLayout />}>
      <Route index element={<Home />} />
      <Route path="/react">
        <Route index element={<LearnReact />} />
      </Route>
      <Route path="/react/vss" element={<VisualStudioCode />} />
      <Route path="/react/git" element={<LearnGit />} />
      <Route path="/react/html" element={<LearnHtml />} />
      <Route path="/react/css" element={<LearnCss />} />
      <Route path="/react/intl" element={<LearnIntl />} />
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

export const RouterProvider = () => {
  return <Router router={router} />;
};
