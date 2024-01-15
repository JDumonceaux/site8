import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

function BlogList() {
  return (
    <div className="blog-list">
      <TwoColumn
        pageTitle={<PageTitle title="Blog" />}
        left={
          <main className="main">
            {/* <LoadingWrapper isLoading={loading} error={error}></LoadingWrapper> */}
            <div></div>
          </main>
        }
        right={<div className="right-column"></div>}
      />
    </div>
  );
}

export default BlogList;
