import Meta from 'components/core/Meta/Meta';
import Layout from 'components/layouts/Layout/Layout';
import HomeScreen5 from './HomeScreen5';
import { APP_NAME } from 'lib/utils/constants';

const HomePage = (): JSX.Element => {
  const title = `${APP_NAME} - Home`;

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <HomeScreen5 />
      </Layout.Main>
    </>
  );
};

export default HomePage;
