import { styled, keyframes } from 'styled-components';
import { PinkGraphic } from './PinkGraphic';
import { HomeMenu } from 'components/common/Menu/MainMenu/HomeMenu';
import { TitleAnimation } from './Animations/TitleAnimation';

export const HomeScreen4 = (): JSX.Element => {
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
