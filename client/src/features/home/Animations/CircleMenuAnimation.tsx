import { keyframes, styled } from 'styled-components';

import LinkButton from '../LinkButton2/LinkButton';
import { memo, useMemo } from 'react';

const CircleMenuAnimation = memo((): React.JSX.Element => {
  return (
    <>
      {useMemo(
        () => (
          <Button1 to="/react">React</Button1>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Button2 to="/css">CSS</Button2>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Button3 to="/design">Design Styles</Button3>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Button4 to="/cheatsheet">Cheat Sheets</Button4>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Button5 to="/javascript">JavaScript</Button5>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Button6 to="/maintenance">Maintenance</Button6>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Button7 to="/security">Security</Button7>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Button8 to="/aws">AWS</Button8>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Button9 to="/javascript">JavaScript5</Button9>
        ),
        [],
      )}
      {useMemo(
        () => (
          <Button10 to="/stuff">Me Stuff</Button10>
        ),
        [],
      )}
    </>
  );
});

export default memo(CircleMenuAnimation);

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
const Button10 = styled(Button)`
  animation-name: ${lpcAnimation('+ 350px', '- 100px')};
`;
