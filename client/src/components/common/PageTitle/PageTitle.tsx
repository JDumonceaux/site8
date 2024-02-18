import './pageTitle.css';

export function PageTitle({ title }: { title: string }): JSX.Element {
  return (
    <div className="page-title" data-testid="page-title">
      <h1>{title}</h1>
    </div>
  );
}
