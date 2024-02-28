import { styled, keyframes } from 'styled-components';
import { PinkGraphic } from './PinkGraphic';
import { HomeMenu } from 'components/common/MainMenu/HomeMenu';

export const HomeScreen4 = (): JSX.Element => {
  return (
    <>
      <StyledSection>
        <Title>React Notes</Title>
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
const lpcAnimation3 = keyframes`
 0% { transform: translateY(800px);}
 100% { transform: translateY(0%); }
`;
const Title = styled.div`
  background: url('/images/background/title.jpg') no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 8rem;
  //mix-blend-mode: difference;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.9, 1.2);
  animation-name: ${lpcAnimation3};
`;
const lpcFadeIn = keyframes`
//  0% { opacity: 0;}
//  100% { opacity: 1; }
`;
const StyledVideo = styled.video`
  animation-duration: 5s;
  animation-name: ${lpcFadeIn};
`;
