import HomeMenu from 'components/pages/HomePage/HomeMenu';
import { keyframes, styled } from 'styled-components';
import TitleAnimation from './Animations/TitleAnimation';
import PinkGraphic from './PinkGraphic';

const HomeScreen4 = (): JSX.Element => {
  return (
    <>
      <StyledSection>
        <TitleAnimation />
        <PinkGraphic />
        <StyledVideo autoPlay id="video-bg" loop muted playsInline>
          <source
            src="/images/background/tactus-waves-hero.mp4"
            type="video/mp4"
          />
        </StyledVideo>
      </StyledSection>
      <StyledSection>
        <HomeMenu />
      </StyledSection>
    </>
  );
};

export default HomeScreen4;

const StyledSection = styled.section`
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
`;
const lpcFadeIn = keyframes`
//  0% { opacity: 0;}
//  100% { opacity: 1; }
`;
const StyledVideo = styled.video`
  animation-duration: 5s;
  animation-name: ${lpcFadeIn};
`;