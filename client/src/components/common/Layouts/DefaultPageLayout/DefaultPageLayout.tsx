import LeftSideMenu from "../../LeftSideMenu/LeftSideMenu";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

import "./defaultPageLayout.css";

interface IProps {
  children: React.ReactNode;
}

const DefaultPageLayout = ({ children }: IProps) => {
  return (
    <div className="contentWrapper">
      <Header />
      <div className="content">
        <LeftSideMenu />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultPageLayout;
