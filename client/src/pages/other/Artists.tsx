import PageTitle from 'components/common/PageTitle/PageTitle';
import SEO from 'components/common/SEO/SEO';

export default function Artists() {
  const title = 'Art';

  return (
    <>
      <SEO title={title} />
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
