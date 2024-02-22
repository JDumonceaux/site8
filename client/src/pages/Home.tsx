import { Seo } from 'components/common';
import { HomeScreen4 } from 'components/ui/HomeScreen/HomeScreen4';
import { styled } from 'styled-components';

export default function Home(): JSX.Element {
  const title = 'Home';

  return (
    <>
      <Seo title={title} />
      <StyledMain>
        <HomeScreen4 />
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  background-color: #000;
  background-position: center;
  background-size: contain;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
`;
