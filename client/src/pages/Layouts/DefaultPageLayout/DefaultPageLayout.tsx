import LeftSideMenu from "../../../components/common/LeftSideMenu/LeftSideMenu";
import Footer from "../../../components/common/Footer/Footer";
import Header from "../../../components/common/Header/Header";

import "./defaultPageLayout.css";
import { Outlet } from "react-router-dom";

const DefaultPageLayout = () => {
  return (
    <div className="contentWrapper">
      <Header />
      <div className="content">
        <LeftSideMenu />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultPageLayout;
