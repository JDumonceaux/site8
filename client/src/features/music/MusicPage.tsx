import React from 'react';

import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';

const MusicPage = (): React.JSX.Element => {
  const title = 'YouTube Videos';

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />
        <section>
          <p>These are some of my favorite YouTube videos.</p>
          {/* <LoadingWrapper error={error} isLoading={isLoading}>
            <List
              height={600}
              itemCount={data?.items?.length ? data?.items?.length : 0}
              itemData={itemData}
              itemSize={220}
              overscanCount={15}
              width="100%">
              {ItemRenderer}
            </List>

          </LoadingWrapper> */}
        </section>
      </Layout.Main>
    </>
  );
};

export default MusicPage;
