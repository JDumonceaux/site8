import { SEO } from 'components/common/SEO';
import { HomeScreen4 } from 'components/ui/HomeScreen/HomeScreen4';
import { styled } from 'styled-components';

export default function Home(): JSX.Element {
  const title = 'Home';

  return (
    <>
      <SEO title={title} />
      <StyledMain>
        <HomeScreen4 />
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  background-color: #000;
  background-size: contain;
  overflow: hidden;
  // This doesn't work with two monitors
  height: 100vh;
  width: 100%;
`;
