import {
  Route,
  RouterProvider as Router,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../../pages/Home";
import DefaultPageLayout from "../../pages/Layouts/DefaultPageLayout/DefaultPageLayout";
import NotFound from "../../pages/NotFound";

import LearnCss from "../../pages/react/LearnCss";
import LearnGit from "../../pages/react/LearnGit";
import LearnHtml from "../../pages/react/LearnHtml";
import LearnIntl from "../../pages/react/LearnIntl";
import LearnReact from "../../pages/react/LearnReact";
import VisualStudioCode from "../../pages/react/VisualStudioCode";
import TestGrid from "../../pages/react/TestGrid";
import Sitemap from "../../pages/Sitemap";
import Home2 from "../../pages/other/Home2";
import ArtList from "../../pages/other/ArtList";
import BookList from "../../pages/other/BookList";
import MusicList from "../../pages/other/MusicList";
import PlaceHolder from "../../pages/PlaceHolder";
import { musicLoader } from "../../pages/other/musicLoader";
import Blog from "../../pages/other/BlogList";
import PhotoList from "../../pages/other/PhotoList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<DefaultPageLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="react" element={<DefaultPageLayout />}>
        <Route index element={<LearnReact />} />
        <Route path="vss" element={<VisualStudioCode />} />
        <Route path="git" element={<LearnGit />} />
        <Route path="intl" element={<LearnIntl />} />
      </Route>
      <Route path="web" element={<DefaultPageLayout />}>
        <Route index element={<LearnReact />} />
        <Route path="html" element={<LearnHtml />} />
        <Route path="css" element={<LearnCss />} />
        <Route path="test-grid" element={<TestGrid />} />

        <Route path="chrome" element={<PlaceHolder title="Chrome" />} />

        <Route
          path="visual-studio-code"
          element={<PlaceHolder title="Visual Studio Code" />}
        >
          <Route
            path="extensions"
            element={<PlaceHolder title="Visual Studio Code - Extensions" />}
          />
        </Route>

        <Route path="npm" element={<PlaceHolder title="NPM" />} />

        <Route path="git" element={<PlaceHolder title="GIT" />} />

        <Route path="git-hub" element={<PlaceHolder title="GIT Hub" />} />

        <Route
          path="material-design"
          element={<PlaceHolder title="Material Design" />}
        />
        <Route
          path="font-pairing"
          element={<PlaceHolder title="Font Pairing" />}
        />
      </Route>
      {/* Programming */}
      <Route path="programming" element={<DefaultPageLayout />}>
        <Route index element={<PlaceHolder title="Programming" />} />
        <Route path="solid" element={<PlaceHolder title="SOLID" />} />
        <Route
          path="design-patterns"
          element={<PlaceHolder title="Design Patterns" />}
        />
        <Route
          path="dynamic-programming-questions"
          element={<PlaceHolder title="Dynamic Programming Questions" />}
        />
      </Route>

      <Route path="other" element={<DefaultPageLayout />}>
        <Route index element={<Home2 />} />
        <Route path="art">
          <Route index element={<ArtList />} />
        </Route>
        <Route path="books">
          <Route index element={<BookList />} />
        </Route>
        <Route path="music">
          <Route index element={<MusicList />} loader={musicLoader} />
        </Route>
        <Route path="photography">
          <Route index element={<PhotoList />} />
        </Route>
        <Route path="blog">
          <Route index element={<Blog />} />
        </Route>
      </Route>

      <Route path="sitemap" element={<Sitemap />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export const RouterProvider = () => {
  return <Router router={router} />;
};
