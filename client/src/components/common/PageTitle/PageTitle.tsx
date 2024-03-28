type PageTitleProps = {
  readonly title?: string;
};

export const PageTitle = ({ title }: PageTitleProps): JSX.Element | null => {
  if (!title) {
    return null;
  }

  return (
    <div className="page-title" data-testid="page-title">
      <h1>{title}</h1>
    </div>
  );
};
