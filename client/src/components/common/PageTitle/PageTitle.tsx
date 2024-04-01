type PageTitleProps = {
  readonly title?: string;
};

export const PageTitle = ({ title }: PageTitleProps): JSX.Element | null => {
  if (!title) {
    return null;
  }

  return <h1 data-testid="page-title">{title}</h1>;
};
