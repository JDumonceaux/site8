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
        {/* <LinkButton to="/design">Design</LinkButton>
        <LinkButton to="/artists">Artist</LinkButton>
        <LinkButton to="/art">Art</LinkButton>
        <LinkButton to="/general">General</LinkButton>
        
        <LinkButton to="/react-project">React Project</LinkButton>
        <LinkButton to="/code-solutions">Code Solutions</LinkButton>
        <LinkButton to="/patterns">Patterns</LinkButton> */}
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

const lpcAnimation1 = keyframes`
  0% {
    top: ${Y_MIDDLE};
    left: calc(${X_MIDDLE} - 100px);
  }
  100% {
    top: ${CENTER_TOP};
    left: calc(${X_MIDDLE} - 100px);
  }
`;
const lpcAnimation2 = keyframes`
  0% {
    top: ${Y_MIDDLE};
    left: calc(${X_MIDDLE} - 100px);
  }
  100% {
    top: calc(${CENTER_TOP} + 50px);
    left: calc(${X_MIDDLE} - 300px);
  }
`;
const lpcAnimation3 = keyframes`
  0% {
    top: ${Y_MIDDLE};
    left: calc(${X_MIDDLE} - 75px);
  }
  100% {
    top: calc(${CENTER_TOP} + 50px);
    left: calc(${X_MIDDLE} + 75px);
  }
`;
const lpcAnimation4 = keyframes`
  0% {
    top: ${Y_MIDDLE};
    left: calc(${X_MIDDLE} - 75px);
  }
  100% {
    top: calc(${CENTER_TOP} + 100px);
    left: calc(${X_MIDDLE} - 300px);
  }
`;
const lpcAnimation5 = keyframes`
  0% {
    top: ${Y_MIDDLE};
    left: calc(${X_MIDDLE} - 75px);
  }
  100% {
    top: calc(${CENTER_TOP} + 100px);
    left: calc(${X_MIDDLE} + 150px);
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
  animation-name: ${lpcAnimation1};
`;
const Button2 = styled(Button)`
  animation-name: ${lpcAnimation2};
`;
const Button3 = styled(Button)`
  animation-name: ${lpcAnimation3};
`;
const Button4 = styled(Button)`
  animation-name: ${lpcAnimation4};
`;
const Button5 = styled(Button)`
  animation-name: ${lpcAnimation5};
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
  width: 30px;
  height: 30px;
  background: cyan;
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
