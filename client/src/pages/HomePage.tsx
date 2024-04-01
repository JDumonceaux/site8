import { Meta } from 'components/common/Meta';
import StyledMain from 'components/common/StyledMain';
import { HomeScreen5 } from 'components/ui/HomeScreen/HomeScreen5';
import { APP_NAME } from 'utils';

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
