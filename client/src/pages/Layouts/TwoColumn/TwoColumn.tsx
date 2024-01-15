import { ReactNode } from "react";
import "./twoColumn.css";

interface IProps {
  pageTitle: ReactNode;
  left: ReactNode;
  right: ReactNode;
}

function TwoColumn({ pageTitle, left, right }: IProps) {
  return (
    <main className="main" role="main">
      {pageTitle}
      <div className="content">
        <div className="col-left">{left}</div>
        <div className="col-right">{right}</div>
      </div>
    </main>
  );
}

export default TwoColumn;
