import { Footer } from "../../../components/common/Footer/Footer";
import { Header } from "../../../components/common/Header/Header";
import { LeftSideMenu } from "../../../components/common/LeftSideMenu/LeftSideMenu";
import "./listPageLayout.css";
import { Outlet } from "react-router-dom";

function ListPageLayout() {
  return (
    <div className="list-page-layout">
      <Header />
      <div className="layout">
        <LeftSideMenu />
        <main className="main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ListPageLayout;
