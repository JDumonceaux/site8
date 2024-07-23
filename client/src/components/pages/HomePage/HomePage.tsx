import StyledMain from 'components/common/StyledMain/StyledMain';
import HomeScreen5 from 'components/pages/HomePage/HomeScreen5';
import Meta from 'components/ui/Meta/Meta';
import { APP_NAME } from 'utils/constants';

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
