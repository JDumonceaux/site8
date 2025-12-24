import type { JSX } from 'react';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import PageTitle from '@components/core/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import Items from './Items';
import useTravel from './useTravel';

const TravelPage = (): JSX.Element => {
  const title = 'Travel Destinations';
  const { data, error, isError, isLoading } = useTravel();

  if (isError && error) {
    console.error('TravelPage: Error loading travel destinations', error);
  }

  return (
    <>
      <title>{title}</title>
      <meta
        name="description"
        content="Explore amazing destinations around the world."
      />
      <Layout.Main>
        <PageTitle title={title} />
        <section>
          <p>Explore amazing destinations around the world.</p>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            <Items data={data} />
          </LoadingWrapper>
        </section>
      </Layout.Main>
    </>
  );
};

export default TravelPage;
