import { useEffect } from "react";

import { APP_NAME } from "../../utils/constants";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

import "./imageLinkExample.css";

export default function ImageLinkExample() {
  useEffect(() => {
    document.title = `${APP_NAME} - Image Link Example`;
  }, []);

  return (
    <div className="buttons-example">
      <TwoColumn
        pageTitle={<PageTitle title="Image Link Example" />}
        left={
          <main className="main">
            <a href="https://www.theartnewspaper.com/" className="image-link">
              <div>
                <img src="/images/links/artnewspaper.png" />
                <div>The Art Newspaper</div>
              </div>
            </a>
            <br />
            <div>
              <a href="#" className="custom-link">
                <img
                  src="/public/images/links/artnewspaper.png"
                  alt="Link Image"
                />
                <span>Your Text</span>
              </a>
            </div>
          </main>
        }
        right={<div className="right-column"></div>}
      />
    </div>
  );
}
