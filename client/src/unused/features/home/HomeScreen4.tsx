import type { JSX } from 'react';

import HomeMenu from '@features/home/HomeMenu';
import TitleAnimation from '../../../features/home/animations/TitleAnimation';
import PinkGraphic from './PinkGraphic';
import { keyframes, styled } from 'styled-components';

const HomeScreen4 = (): JSX.Element => {
  return (
    <>
      <StyledSection>
        <TitleAnimation />
        <PinkGraphic />
        <StyledVideo
          muted
          playsInline
          id="video-bg"
          autoPlay
          loop
        >
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
