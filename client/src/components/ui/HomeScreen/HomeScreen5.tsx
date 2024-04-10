import { styled, keyframes } from 'styled-components';
import { HomeMenu } from 'components/common/Menu/MainMenu/HomeMenu';

import StyledMain from 'components/common/StyledMain';
import { LinkButton } from './LinkButton';

export const HomeScreen5 = (): JSX.Element => {
  return (
    <StyledMain.FullWidth>
      <StyledMain.PageSection>
        <Title>React Notes</Title>
        <Button1 to="/react">React</Button1>
        <Button2 to="/css">CSS</Button2>
        <Button3 to="/design">Design Styles</Button3>
        <Button4 to="/cheatsheet">Cheat Sheets</Button4>
        <Button5 to="/javascript">JavaScript</Button5>
        <Button6 to="/javascript">JavaScript2</Button6>
        <Button7 to="/javascript">JavaScript3</Button7>
        <Button8 to="/javascript">JavaScript4</Button8>
        <Button9 to="/javascript">JavaScript5</Button9>
        <CircleWrapper>
          <Circle />
        </CircleWrapper>
      </StyledMain.PageSection>
      <StyledMain.PageSection>
        <HomeMenu />
      </StyledMain.PageSection>
    </StyledMain.FullWidth>
  );
};

const lpcAnimation30 = keyframes`
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
  animation-name: ${lpcAnimation30};
`;
const Y_MIDDLE = '50dvh';
const X_MIDDLE = '50dvw';
const CENTER_TOP = '25dvh';

const lpcAnimation = (topOffset: string, leftOffset: string) => keyframes`
  0% {
    top: ${Y_MIDDLE};
    left: calc(${X_MIDDLE} - 75px);
  }
  100% {
    top: calc(${CENTER_TOP} ${topOffset});
    left: calc(${X_MIDDLE} ${leftOffset});
  }
`;
const Button = styled(LinkButton)`
  position: absolute;
  z-index: 0;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.9, 1.2);
  animation-fill-mode: forwards;
`;
const Button1 = styled(Button)`
  animation-name: ${lpcAnimation('- 0px', '- 100px')};
`;
const Button2 = styled(Button)`
  animation-name: ${lpcAnimation('+ 70px', '- 300px')};
`;
const Button3 = styled(Button)`
  animation-name: ${lpcAnimation('+ 70px', '+ 100px')};
`;
const Button4 = styled(Button)`
  animation-name: ${lpcAnimation('+ 140px', '- 350px')};
`;
const Button5 = styled(Button)`
  animation-name: ${lpcAnimation('+ 140px', '+ 150px')};
`;
const Button6 = styled(Button)`
  animation-name: ${lpcAnimation('+ 210px', '- 350px')};
`;
const Button7 = styled(Button)`
  animation-name: ${lpcAnimation('+ 210px', '+ 150px')};
`;
const Button8 = styled(Button)`
  animation-name: ${lpcAnimation('+ 280px', '+ 100px')};
`;
const Button9 = styled(Button)`
  animation-name: ${lpcAnimation('+ 280px', '- 300px')};
`;

const CIRCLE_DIAM = '200px';
const CIRCLE_RADI = '100px';

const lpcAnimation40 = keyframes`
  0%{
    transform:rotate(0deg)
              translate(-100px)
              rotate(0deg);
  }
  100%{
    transform:rotate(360deg)
              translate(-100px)
              rotate(-360deg);
  }
`;
const Circle = styled.div`
  width: 20px;
  height: 20px;
  background: var(--palette-main-color);
  opacity: 0.75;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  margin: auto;
  animation: circle 6s linear infinite;
  animation-name: ${lpcAnimation40};
`;
const CircleWrapper = styled.div`
  width: ${CIRCLE_DIAM};
  height: ${CIRCLE_DIAM};
  border: 1px solid #ccc;
  position: absolute;
  top: calc(${Y_MIDDLE} - ${CIRCLE_RADI});
  left: calc(${X_MIDDLE} - ${CIRCLE_RADI});
  margin: auto;
  border-radius: 50%;
`;
