import { useMemo } from 'react';

import Meta from 'components/core/Meta/Meta';
import Layout from 'components/layouts/Layout/Layout';
import { APP_NAME } from 'lib/utils/constants';

import HomeScreen5 from './HomeScreen5';

const HomePage = (): React.JSX.Element => {
  const title = `${APP_NAME} - Home`;
  const memoizedMeta = useMemo(() => <Meta title={title} />, [title]);

  return (
    <>
      {memoizedMeta}
      <Layout.Main>
        <HomeScreen5 />
      </Layout.Main>
    </>
  );
};

export default HomePage;
