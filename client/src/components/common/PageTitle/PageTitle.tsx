import './pageTitle.css';

export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="page-title" data-testid="PageTitle.root">
      <h1>{title}</h1>
    </div>
  );
}
