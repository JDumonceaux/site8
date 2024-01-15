import { APP_NAME } from "../../utils/constants";

import { useEffect } from "react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

import "./artList.css";

export default function Artists() {
  useEffect(() => {
    document.title = `${APP_NAME} - Artists`;
  }, []);

  return (
    <div className="art-list" data-testid="Artists.root">
      <TwoColumn
        pageTitle={<PageTitle title="ArtList" />}
        left={
          <main className="main">
            <img
              src="https://www.edvardmunch.org/images/paintings/the-scream.jpg"
              title="The Scream"
              alt="The Scream"
            />
          </main>
        }
        right={<div className="right-column"></div>}
      />
    </div>
  );
}
