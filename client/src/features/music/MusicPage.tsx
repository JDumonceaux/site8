import React from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'features/layouts/Layout/Layout';

import useMusic from './useMusic';

const MusicPage = (): React.JSX.Element => {
  const title = 'YouTube Videos';

  const { data, error, isError, isLoading } = useMusic();

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />
        <section>
          <p>These are some of my favorite YouTube videos.</p>
          <LoadingWrapper error={error} isError={isError} isLoading={isLoading}>
            TODO
            {/* <List
              height={600}
              itemCount={data?.items.length ? data.items.length : 0}
              itemData={itemData}
              itemSize={220}
              overscanCount={15}
              width="100%">
              {ItemRenderer}
            </List> */}
          </LoadingWrapper>
        </section>
      </Layout.Main>
    </>
  );
};

export default MusicPage;
