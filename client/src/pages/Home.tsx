import { Meta } from 'components/common/Meta';
import { HomeScreen4 } from 'components/ui/HomeScreen/HomeScreen4';
import { styled } from 'styled-components';

export const Home = (): JSX.Element => {
  const title = 'Home';

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <HomeScreen4 />
      </StyledMain>
    </>
  );
};

export default Home;

const StyledMain = styled.main`
  background-color: #000;
  background-size: contain;
  overflow: hidden;
  // This doesn't work with two monitors
  height: 100vh;
  width: 100%;
`;
