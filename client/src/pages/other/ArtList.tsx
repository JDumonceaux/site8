import { APP_NAME } from "../../utils/constants";

import { useEffect } from "react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

import "./artList.css";

export default function ArtList() {
  useEffect(() => {
    document.title = `${APP_NAME} - Art`;
  }, []);

  return (
    <TwoColumn
      pageTitle={<PageTitle title="Art" />}
      left={
        <>
          <section className="section">
            <div>
              <img
                src="https://www.edvardmunch.org/images/paintings/the-scream.jpg"
                title="The Scream"
                alt="The Scream"
                height={400}
              />
              <div>Edvard Munch - The Scream (1893)</div>
            </div>
          </section>
          <section className="section">
            <div>
              <img
                src="/images/art/the-starry-night.png"
                title="The Starry Night"
                alt="The Starry Night"
                height={400}
              />
              <div></div>
            </div>
          </section>
          <section className="section">
            <div>
              <img
                src="/images/art/starry-night-over-the-rhone.png"
                title="Starry Night over the Rhone"
                alt="Starry Night over the Rhone"
                height={400}
              />
              <div></div>
            </div>
          </section>
          <section className="section">
            <div>
              <img
                src="/images/art/600px-A_Sunday_on_La_Grande_Jatte,_Georges_Seurat,_1884.jpg"
                title="A Sunday on the La Grande Jatte"
                alt="Starry Night over the Rhone"
                height={400}
              />
              <div></div>
            </div>
          </section>
        </>
      }
      right={<div className="right-column"></div>}
    />
  );
}
