import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

function LearnReact() {
  return (
    <div className="learn-react">
      <TwoColumn
        pageTitle={<PageTitle title="React" />}
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

export default LearnReact;
