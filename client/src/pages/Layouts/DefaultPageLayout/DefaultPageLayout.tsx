import { Footer } from "../../../components/common/Footer/Footer";
import { Header } from "../../../components/common/Header/Header";
import { LeftSideMenu } from "../../../components/common/LeftSideMenu/LeftSideMenu";
import "./defaultPageLayout.css";
import { Outlet } from "react-router-dom";

function DefaultPageLayout() {
  return (
    <div className="default-page-layout">
      <Header />
      <div className="layout">
        <div className="left-col">
          <LeftSideMenu />
        </div>
        <div className="right-col">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultPageLayout;
