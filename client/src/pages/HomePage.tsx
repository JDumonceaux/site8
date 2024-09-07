import StyledMain from 'components/common/StyledMain/StyledMain';
import Meta from 'components/Meta/Meta';
import HomeScreen5 from 'components/pages/HomePage/HomeScreen5';
import { APP_NAME } from 'lib/utils/constants';

const HomePage = (): JSX.Element => {
  const title = `${APP_NAME} - Home`;

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <HomeScreen5 />
      </StyledMain>
    </>
  );
};

export default HomePage;
