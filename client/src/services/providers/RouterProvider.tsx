import {
  Route,
  RouterProvider as Router,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../../pages/Home";
import DefaultPageLayout from "../../pages/Layouts/DefaultPageLayout/DefaultPageLayout";
import NotFound from "../../pages/NotFound";

import GenericPage from "../../pages/react/GenericPage";

import TestGrid from "../../pages/react/TestGrid";
import Sitemap from "../../pages/Sitemap";
import Home2 from "../../pages/other/Home2";
import Yachts from "../../pages/other/Yachts";
import ArtList from "../../pages/other/ArtList";
import Artists from "../../pages/other/Artists";
import Blog from "../../pages/other/BlogList";
import BookList from "../../pages/other/BookList";
import MusicList from "../../pages/other/MusicList";
import PhotoList from "../../pages/other/PhotoList";
import ResourcesList from "../../pages/other/ResourcesList";
import { genericPageLoader } from "../../pages/react/genericPageLoader";
import FormExample1 from "../../pages/examples/FormExample1";
import FormExample2 from "../../pages/examples/FormExample2";
import ImageLinkExample from "../../pages/examples/ImageLinkExample";
import Skeuomorphism from "../../pages/styles/Skeuomorphism";
import FlatDesign from "../../pages/styles/FlatDesign";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<DefaultPageLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* REACT */}
      <Route path="react" element={<DefaultPageLayout />}>
        <Route path="tutorial">
          <Route
            path="1"
            element={<GenericPage id={1} pageTitle="React Tutorial" />}
          />
          <Route
            path="2"
            element={<GenericPage id={2} pageTitle="Creating A Project" />}
          />
          <Route
            path="3"
            element={<GenericPage id={3} pageTitle="Creating A Project" />}
          />
          <Route
            path="4"
            element={<GenericPage id={4} pageTitle="Creating A Project" />}
          />
        </Route>
      </Route>

      {/* IDE */}
      <Route path="ide" element={<DefaultPageLayout />}>
        <Route
          path="chrome"
          element={<GenericPage id={51} pageTitle="Chrome" />}
        />
        <Route
          path="vsc"
          element={<GenericPage id={52} pageTitle="Visual Studio Code" />}
        />
        <Route
          path="vsc/extensions"
          element={
            <GenericPage id={53} pageTitle="Visual Studio Code: Extensions" />
          }
        />
        <Route
          path="vsc/help"
          element={<GenericPage id={54} pageTitle="Visual Studio Code: Help" />}
          loader={genericPageLoader(54)}
        />
        <Route
          path="npm"
          element={<GenericPage id={55} pageTitle="NPM" />}
          loader={genericPageLoader(55)}
        />
        <Route path="git" element={<GenericPage id={56} pageTitle="Git" />} />
        <Route
          path="github"
          element={<GenericPage id={57} pageTitle="GitHub" />}
        />
        <Route
          path="aws/commit"
          element={<GenericPage id={58} pageTitle="AWS Commit" />}
        />
      </Route>

      {/* WEB */}
      <Route path="web" element={<DefaultPageLayout />}>
        <Route path="html" element={<GenericPage id={0} pageTitle="HTML" />} />
        <Route path="css" element={<GenericPage id={0} pageTitle="CSS" />} />
      </Route>

      {/* DESIGN */}
      <Route path="design" element={<DefaultPageLayout />}>
        <Route
          path="material-design"
          element={<GenericPage id={0} pageTitle="Material Design" />}
        />
        <Route
          path="font-pairing"
          element={<GenericPage id={0} pageTitle="Font Pairing" />}
        />
      </Route>

      {/* TESTING */}
      <Route path="testing" element={<DefaultPageLayout />}>
        <Route index element={<TestGrid />} />
      </Route>

      {/* Programming */}
      <Route path="programming" element={<DefaultPageLayout />}>
        <Route
          path="font-pairing"
          element={<GenericPage id={0} pageTitle="Programming" />}
        />
        <Route
          path="solid"
          element={<GenericPage id={0} pageTitle="SOLID" />}
        />
        <Route
          path="design-patterns"
          element={<GenericPage id={0} pageTitle="Design Patterns" />}
        />
        <Route
          path="programming-challenges"
          element={<GenericPage id={0} pageTitle="Programming Challenges" />}
        />
      </Route>

      {/* OTHER STUFF */}
      <Route path="other" element={<DefaultPageLayout />}>
        <Route index element={<Home2 />} />
        <Route path="art">
          <Route index element={<ArtList />} />
          <Route path="kelly-boesh" element={<Artists />} />
          <Route path="shag" element={<Artists />} />
        </Route>

        <Route path="blog">
          <Route index element={<Blog />} />
        </Route>
        <Route path="books">
          <Route index element={<BookList />} />
        </Route>

        <Route path="photography">
          <Route index element={<PhotoList />} />
        </Route>
        <Route path="resources">
          <Route index element={<ResourcesList />} />
        </Route>
        <Route path="yachts">
          <Route index element={<Yachts />} />
        </Route>
        <Route path="videos">
          <Route index element={<MusicList />} />
          <Route path="you-tube" element={<MusicList />} />
        </Route>
      </Route>

      {/* STYLES */}
      <Route path="styles" element={<DefaultPageLayout />}>
        <Route path="flat-design" element={<FlatDesign />} />
        <Route path="skeuomorphism" element={<Skeuomorphism />} />
      </Route>

      {/* EXAMPLES */}
      <Route path="examples" element={<DefaultPageLayout />}>
        <Route path="form/1" element={<FormExample1 />} />
        <Route path="form/2" element={<FormExample2 />} />
        <Route path="buttons" element={<ImageLinkExample />} />
      </Route>

      <Route path="sitemap" element={<Sitemap />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export const RouterProvider = () => {
  return <Router router={router} />;
};
