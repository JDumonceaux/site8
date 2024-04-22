'use client';
import { Meta, PageTitle } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';

const Artists = (): JSX.Element => {
  const title = 'Art';

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <PageTitle title={title} />
        <section>
          <img
            alt="The Scream"
            src="https://www.edvardmunch.org/images/paintings/the-scream.jpg"
            title="The Scream"
          />
        </section>
      </StyledMain>
    </>
  );
};

export default Artists;
