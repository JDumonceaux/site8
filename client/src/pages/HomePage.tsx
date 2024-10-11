
import Meta from 'components/core/Meta/Meta';
import HomeScreen5 from 'components/pages/HomePage/HomeScreen5';
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
