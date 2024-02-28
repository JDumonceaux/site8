import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';

export const ArtList = (): JSX.Element => {
  const title = 'Art';

  return (
    <>
      <Meta title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <div>
            <img
              alt="The Scream"
              height={400}
              src="https://www.edvardmunch.org/images/paintings/the-scream.jpg"
              title="The Scream"
            />
            <div>Edvard Munch - The Scream (1893)</div>
          </div>
        </section>
        <section className="section">
          <div>
            <img
              alt="The Starry Night"
              height={400}
              src="/images/art/the-starry-night.png"
              title="The Starry Night"
            />
            <div />
          </div>
        </section>
        <section className="section">
          <div>
            <img
              alt="Starry Night over the Rhone"
              height={400}
              src="/images/art/starry-night-over-the-rhone.png"
              title="Starry Night over the Rhone"
            />
            <div />
          </div>
        </section>
        <section className="section">
          <div>
            <img
              alt="Starry Night over the Rhone"
              height={400}
              src="/images/art/600px-A_Sunday_on_La_Grande_Jatte,_Georges_Seurat,_1884.jpg"
              title="A Sunday on the La Grande Jatte"
            />
            <div />
          </div>
        </section>
      </main>
      <aside className="right-sidebar" />
    </>
  );
};

export default ArtList;
