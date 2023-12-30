import { useTranslation } from "react-i18next";
import "./home2.css";
import PageTitle from "../../components/common/PageTitle/PageTitle";

function Home2() {
  const { t } = useTranslation();
  return (
    <div>
      <PageTitle title="Home" />

      <div className="home2-container">
        <div className="left-column">
          <div>{t("greeting")}</div>
          <div>
            Please keep your arms, hands, legs, feet and head inside the ride
            vehicle at all times.
          </div>
          <div>For your own safety, don't stay long.</div>
        </div>
        <div className="right-column">
          <img src="./face.png" alt="" />
          <div className="swatch-container">
            This page is inspired by the{" "}
            <a href=" https://www.pantone.com/color-of-the-year/2023">
              2023 Pantone&#174; Color of the Year
            </a>
            <div className="swatch-wrapper">
              <div className="swatch">&nbsp;</div>
              <div className="swatch-text">Viva Magenta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home2;
