import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';

export const Artists = (): JSX.Element => {
  const title = 'Art';

  return (
    <>
      <Meta title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <img
            alt="The Scream"
            src="https://www.edvardmunch.org/images/paintings/the-scream.jpg"
            title="The Scream"
          />
        </section>
      </main>
      <aside className="right-sidebar" />
    </>
  );
};

export default Artists;
