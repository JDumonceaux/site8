import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

export default function LearnHtml() {
  return (
    <div className="learn-html">
      <TwoColumn
        pageTitle={<PageTitle title="HTML" />}
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
