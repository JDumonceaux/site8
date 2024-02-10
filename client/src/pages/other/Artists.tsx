import { PageTitle, Seo } from '../../components/common';

export default function Artists(): JSX.Element {
  const title = 'Art';

  return (
    <>
      <Seo title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <img
            src="https://www.edvardmunch.org/images/paintings/the-scream.jpg"
            title="The Scream"
            alt="The Scream"
          />
        </section>
      </main>
      <aside className="right-sidebar"></aside>
    </>
  );
}
