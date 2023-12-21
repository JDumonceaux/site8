import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import DefaultPageLayout from "./components/common/Layouts/DefaultPageLayout/DefaultPageLayout";

export default function App() {
  return (
    <DefaultPageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/2" element={<Page2 />} />
        <Route path="/3" element={<Page3 />} />
        <Route path="/4" element={<Page4 />} />
      </Routes>
    </DefaultPageLayout>
  );
}
