import Footer from "../../../components/common/Footer/Footer";
import Header from "../../../components/common/Header/Header";
import MainMenu from "../../../components/common/AccordionMenu/MainMenu";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import "./defaultPageLayout.css";
import { Outlet } from "react-router-dom";

export default function DefaultPageLayout() {
  return (
    <ErrorBoundary fallback="Error">
      <div className="default-page-layout">
        <Header />
        <div className="content-wrapper">
          <div className="left-content">
            <MainMenu />
          </div>
          <div className="main-content">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
