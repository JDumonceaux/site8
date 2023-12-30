import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

function BookList() {
  return (
    <div className="book-list">
      <TwoColumn
        pageTitle={<PageTitle title="Books" />}
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

export default BookList;
