import PageTitle from "../components/common/PageTitle/PageTitle";
import TwoColumn from "./Layouts/TwoColumn/TwoColumn";

function PlaceHolder({ title }: { title: string }) {
  return (
    <div className="place-holder">
      <TwoColumn
        pageTitle={<PageTitle title={title} />}
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

export default PlaceHolder;
