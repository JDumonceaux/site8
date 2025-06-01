import {} from 'react';

import { keyframes, styled } from 'styled-components';

const TitleAnimation = (): JSX.Element => {
  return <TitleElement>React Notes</TitleElement>;
};

TitleAnimation.displayName = 'TitleAnimation';

export default TitleAnimation;

const lpcAnimation = keyframes`
 0% { transform: translateY(800px);}
 100% { transform: translateY(0%); }
`;
const TitleElement = styled.div`
  //background: url('/images/background/title.jpg') no-repeat;
  background: rgb(34, 195, 189);
  background: linear-gradient(
    0deg,
    rgba(34, 195, 189, 1) 0%,
    rgba(126, 45, 253, 1) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 7rem;
  //mix-blend-mode: difference;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.9, 1.2);
  animation-name: ${lpcAnimation};
`;
