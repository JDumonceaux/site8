import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

function ArtList() {
  return (
    <div className="art-list">
      <TwoColumn
        pageTitle={<PageTitle title="Artists" />}
        left={
          <main className="main">
            <div></div>
          </main>
        }
        right={<div className="right-column"></div>}
      />
    </div>
  );
}

export default ArtList;
