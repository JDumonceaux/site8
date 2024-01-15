import { useEffect } from "react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";
import { APP_NAME } from "../../utils/constants";

export default function Example2() {
  const pageTitle = "YouTube Videos";

  useEffect(() => {
    document.title = `${APP_NAME} - ${pageTitle}`;
  }, []);

  return (
    <TwoColumn
      pageTitle={<PageTitle title={pageTitle} />}
      left={
        <section className="section">
          <p>Form Example.</p>
        </section>
      }
      right={
        <aside className="right-column">
          <br />
        </aside>
      }
    />
  );
}
