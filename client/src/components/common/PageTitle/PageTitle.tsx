import "./pageTitle.css";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="page-title" data-testid="PageTitle.root">
      <h1>{title}</h1>
    </div>
  );
};

export default PageTitle;
