import { type JSX } from 'react';

import { keyframes, styled } from 'styled-components';

const CircleAnimation = (): JSX.Element => {
  return (
    <CircleWrapper>
      <CircleElement />
    </CircleWrapper>
  );
};

CircleAnimation.displayName = 'CircleAnimation';

export default CircleAnimation;

const CIRCLE_DIAM = '200px';
const CIRCLE_RADI = '100px';
const Y_MIDDLE = '50dvh';
const X_MIDDLE = '50dvw';
const kfRotate = keyframes`
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
const CircleWrapper = styled.div`
  width: ${CIRCLE_DIAM};
  height: ${CIRCLE_DIAM};
  border: 1px solid #ccc;
  position: absolute;
  top: calc(${Y_MIDDLE} - ${CIRCLE_RADI});
  left: calc(${X_MIDDLE} - ${CIRCLE_RADI});
  margin: auto;
  border-radius: 50%;
  transform: translateY(10px);
`;
const CircleElement = styled.div`
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
  animation-name: ${kfRotate};
`;
