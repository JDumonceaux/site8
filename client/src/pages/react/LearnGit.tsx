import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

export default function LearnGit() {
  return (
    <div className="learn-git">
      <TwoColumn
        pageTitle={<PageTitle title="GIT" />}
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
