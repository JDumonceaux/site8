type Props = {
  readonly children?: React.ReactNode;
};

const TestsPage = ({ children }: Props): JSX.Element => {
  return <div>{children}</div>;
};

export default TestsPage;
