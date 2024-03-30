import { Meta } from 'components/common/Meta';
import { HomeScreen5 } from 'components/ui/HomeScreen/HomeScreen5';
import { styled } from 'styled-components';
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

const StyledMain = styled.main`
  background-color: #000;
  background-size: contain;
`;
