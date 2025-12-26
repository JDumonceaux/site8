import type { JSX } from 'react';

import { keyframes, styled } from 'styled-components';

// Grid layout constants
const GRID_COLUMNS = 6;
const ARRAY_SIZE_20 = 20;
const ARRAY_SIZE_36 = 36;

// Animation constants
const ANIMATION_DURATION = '1.5s';
const ANIMATION_TIMING = 'cubic-bezier(0.17, 0.67, 0.9, 1)';
const ANIMATION_TIMING_ALT = 'cubic-bezier(0.17, 0.67, 0.9, 1.2)';
const ANIMATION_TRANSLATE_START = '-800px';
const ANIMATION_TRANSLATE_MID = '-50%';
const ANIMATION_TRANSLATE_END = '0%';

// Circle dimensions
const CIRCLE_HEIGHT = 240;
const CIRCLE_WIDTH = 480;
const CIRCLE_RADIUS = `${CIRCLE_HEIGHT}px`;

// Pure functional approach - no mutable state
const generateDots = (
  array: number[],
  color: string,
  xOffset: number,
  yOffset: number,
) => {
  return array.map((item, index) => {
    const x = index % GRID_COLUMNS;
    const y = Math.floor(index / GRID_COLUMNS);
    return (
      <Dot
        key={item}
        left={x * xOffset}
        color={color}
        top={y * yOffset}
      />
    );
  });
};

// Static arrays - no need to regenerate on each render
const ARRAY_20 = Array.from({ length: ARRAY_SIZE_20 }, (_, index) => index + 1);
const ARRAY_36 = Array.from({ length: ARRAY_SIZE_36 }, (_, index) => index + 1);

const PinkGraphic = (): JSX.Element => {
  return (
    <StyledDiv>
      {ARRAY_20.map((item, index) => (
        <WhiteLine
          key={item}
          index={index}
        />
      ))}
      <GenLineAnim
        height={350}
        left={-120}
        width={8}
        z={2}
        color="#808080"
        top={-250}
      />
      <GenLineAnim
        height={400}
        left={-80}
        width={16}
        z={2}
        boxShadow
        color="#303030"
        top={-150}
      />
      <GenLine
        height={140}
        left={-75}
        width={32}
        z={2}
        boxShadow
        color="#9d6060"
        top={-70}
      />
      <GenLine
        height={50}
        left={-50}
        width={15}
        z={3}
        boxShadow
        color="#fff"
        top={-20}
      />
      <GenLine
        height={150}
        left={0}
        width={240}
        z={3}
        color="#fff"
        top={-150}
      />
      <GenLine
        height={400}
        left={11}
        width={4}
        z={3}
        boxShadow
        color="#9d6060"
        top={-270}
      />
      <GenLine
        height={400}
        left={20}
        width={6}
        z={3}
        boxShadow
        color="#9d6060"
        top={-270}
      />
      <DiagLine
        height={100}
        left={75}
        width={8}
        z={3}
        boxShadow
        color="#808080"
        top={-90}
      />
      <DiagLine
        height={100}
        left={75}
        width={8}
        z={3}
        boxShadow
        color="#808080"
        top={-110}
      />
      <DiagLine
        height={100}
        left={75}
        width={8}
        z={3}
        boxShadow
        color="#808080"
        top={-130}
      />
      <DiagLine
        height={100}
        left={75}
        width={8}
        z={3}
        boxShadow
        color="#808080"
        top={-150}
      />
      <LargePinkCircle />
      <LargeGrayTriangle />
      {generateDots(myArray36, '#808080', 20, 20)}
      {generateDots(myArray36, '#9d6060', 10, 10)}
    </StyledDiv>
  );
};

export default PinkGraphic;

const CENTER_TOP = '30dvh';
const CENTER_LEFT = '75dvw';

const StyledDiv = styled.div`
  perspective: 100px;
`;
const WhiteLine = styled.div<{ index: number }>`
  --space: ${(props) => `${props.index * 12}px`};
  position: fixed;
  top: calc(${CENTER_TOP} - 60px);
  left: calc(${CENTER_LEFT} - 150px - var(--space));
  width: 5px;
  height: 50px;
  background-color: #fff;
`;
const lpcAnimation = keyframes`
 0% { transform: translateX(${ANIMATION_TRANSLATE_START});}
 100% { transform: translateX(${ANIMATION_TRANSLATE_MID}); }
`;
const lpcAnimation2 = keyframes`
 0% { transform: translateX(${ANIMATION_TRANSLATE_START});}
 100% { transform: translateX(${ANIMATION_TRANSLATE_END}); }
`;
const LargePinkCircle = styled.div`
  position: fixed;
  top: ${CENTER_TOP};
  left: ${CENTER_LEFT};
  transform: translateX(${ANIMATION_TRANSLATE_MID});
  height: ${CIRCLE_HEIGHT}px;
  width: ${CIRCLE_WIDTH}px;
  border-radius: 0 0 ${CIRCLE_RADIUS} ${CIRCLE_RADIUS};
  background-color: #9d6060;
  z-index: 0;
  animation-duration: ${ANIMATION_DURATION};
  animation-timing-function: ${ANIMATION_TIMING_ALT};
  animation-name: ${lpcAnimation};
`;
const LargeGrayTriangle = styled.div`
  position: fixed;
  top: calc(${CENTER_TOP} - 150px);
  left: ${CENTER_LEFT};
  width: 250px;
  height: 500px;
  background: #808080;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  z-index: 1;
  animation-duration: ${ANIMATION_DURATION};
  animation-timing-function: ${ANIMATION_TIMING};
  animation-name: ${lpcAnimation2};
`;

const GenLine = styled.div<{
  boxShadow?: boolean;
  color: string;
  height: number;
  left: number;
  top: number;
  width: number;
  z: number;
}>`
  position: fixed;
  top: calc(${CENTER_TOP} + ${(props) => `${props.top}px`});
  left: calc(${CENTER_LEFT} + ${(props) => `${props.left}px`});
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  background-color: ${(props) => props.color};
  z-index: ${(props) => props.z};
  box-shadow: ${(props) =>
    props.boxShadow ? 'rgb(0 0 0 / 0.35) 0px 5px 15px' : 'none'};
`;
const GenLineAnim = styled(GenLine)`
  animation-duration: ${ANIMATION_DURATION};
  animation-timing-function: ${ANIMATION_TIMING};
  animation-name: ${lpcAnimation2};
`;

const DiagLine = styled(GenLine)`
  transform: rotate(-45deg);
  box-shadow: 0px 2px 5px 2px rgb(0 0 0 / 0.5);
`;

const Dot = styled.div<{ color: string; left: number; top: number }>`
  position: fixed;
  top: calc(${CENTER_TOP} + ${(props) => props.top}px + 20px);
  left: calc(${CENTER_LEFT} + ${(props) => props.left}px);
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  z-index: 2;
  box-shadow: 2px 2px 5px 0px rgb(0 0 0 / 0.75);
`;
