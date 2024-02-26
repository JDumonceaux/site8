import { styled, keyframes } from 'styled-components';

export const HomeScreen4 = (): JSX.Element => {
  const myArr20 = Array.from({ length: 20 }, (_, index) => index + 1);
  const myArr36 = Array.from({ length: 36 }, (_, index) => index + 1);
  // eslint-disable-next-line immutable/no-let
  let x = -1;
  // eslint-disable-next-line immutable/no-let
  let y = 0;

  return (
    <StyledSection>
      {myArr20.map((item, index) => (
        <WhiteDiv $index={index} key={item} />
      ))}
      <GrayDiv $left={610} />
      <LargePinkCircle />
      <LargeGrayTriangle />
      <SmallPinkBox $left={650} />
      <WhiteBox />
      {myArr36.map((item) => {
        x += 1;
        if (x > 5) {
          x = 0;
          y += 1;
        }
        return <GrayDots $left={x} $top={y} key={item} />;
      })}
      <GenLine
        $color="#fff"
        $height={50}
        $left={-20}
        $top={-25}
        $width={15}
        $z={3}
      />
      <R1C1 />
      <R1C2 />
      <R1C3 />
      <R1C4 />
      <R1C5 />
      <R1C6 />
      <R1C7 />
      <R1C8 />
    </StyledSection>
  );
};

const StyledSection = styled.section``;

const WhiteDiv = styled.div<{ $index: number }>`
  --space: ${(props) => props.$index * 12 + 'px'};
  position: fixed;
  top: calc(50dvh - 60px);
  left: calc(50dvw - 150px - var(--space));
  width: 5px;
  height: 50px;
  background-color: #fff;
`;
const GrayDiv = styled.div<{ $left: number }>`
  position: fixed;
  top: 150px;
  left: ${(props) => (props.$left ? props.$left : '0')}px;
  width: 8px;
  height: 500px;
  background-color: #808080;
  z-index: 1;
`;
const lpcAnimation = keyframes`
 0% { transform: translateX(-800px);}
 100% { transform: translateX(-50%); }
`;
const lpcAnimation2 = keyframes`
 0% { transform: translateX(-800px);}
 100% { transform: translateX(0%); }
`;
const LargePinkCircle = styled.div`
  position: fixed;
  top: 50dvh;
  left: 50dvw;
  transform: translateX(-50%);
  height: 240px;
  width: 480px;
  border-radius: 0 0 240px 240px;
  background-color: #9d6060;
  z-index: 0;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.9, 1.2);
  animation-name: ${lpcAnimation};
`;
const LargeGrayTriangle = styled.div`
  position: fixed;
  top: calc(50dvh - 150px);
  left: 50dvw;
  // transform: translateX(-50%);
  width: 250px;
  height: 500px;
  background: #808080;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  z-index: 1;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.9, 1);
  animation-name: ${lpcAnimation2};
`;
const SmallPinkBox = styled.div<{ $left: number }>`
  position: fixed;
  top: 250px;
  left: ${(props) => (props.$left ? props.$left : '0')}px;
  width: 32px;
  height: 150px;
  background-color: #794a4a;
  z-index: 1;
`;
const WhiteBox = styled.div`
  position: fixed;
  top: calc(50dvh - 150px);
  left: 50dvw;
  width: 240px;
  height: 150px;
  background-color: #fff;
  z-index: 3;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.9, 1);
  animation-name: ${lpcAnimation2};
`;

const GenLine = styled.div<{
  $left: number;
  $top: number;
  $height: number;
  $width: number;
  $color: string;
  $z: number;
}>`
  --top: ${(props) => props.$top + 'px'};
  --offSetTop: calc(50dvh);
  --left: ${(props) => props.$left + 'px'};
  --offSetLeft: calc(50dvw);
  position: fixed;
  top: calc(${(props) => props.$top + 'px'} + var(--offSetTop));
  left: calc(var(--left) + var(--offSetLeft));
  height: ${(props) => props.$height + 'px'};
  width: ${(props) => props.$width + 'px'};
  background-color: ${(props) => props.$color};
  z-index: ${(props) => props.$z};
`;

const GrayDots = styled.div<{ $left: number; $top: number }>`
  --top: ${(props) => props.$top * 20 + 'px'};
  --offSetTop: calc(50dvh + 20px);
  --left: ${(props) => props.$left * 20 + 'px'};
  --offSetLeft: calc(50dvw - 240px);
  position: fixed;
  top: calc(var(--top) + var(--offSetTop));
  left: calc(var(--left) + var(--offSetLeft));
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #808080;
  z-index: 2;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

const breatheAnimation = keyframes`
 0% { height: 25px; width: 25px; }
//  30% { height: 400px; width: 400px; opacity: 1 }
//  40% { height: 405px; width: 405px; opacity: 0.3; }
 100% { height: 100px; width: 100px; opacity: 0.6; }
`;
const SDiv = styled.div`
  position: fixed;
  width: 25px;
  height: 25px;
  animation-name: ${breatheAnimation};
  animation-delay: 1s;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
`;
const R1C1 = styled(SDiv)`
  top: 0;
  left: 0;
  background-color: purple;
`;
const R1C2 = styled(SDiv)`
  top: 0px;
  left: 100px;
  background-color: red;
  transition-property: left;
  transition-duration: 0.5s;
`;
const R1C3 = styled(SDiv)`
  top: 0px;
  left: 200px;
  background-color: blue;
`;
const R1C4 = styled(SDiv)`
  top: 0px;
  left: 300px;
  background-color: #1a5276;
`;
const R1C5 = styled(SDiv)`
  top: 0px;
  left: 400px;
  background-color: #daf7a6;
`;
const R1C6 = styled(SDiv)`
  top: 0px;
  left: 500px;
  background-color: #ff5733;
`;
const R1C7 = styled(SDiv)`
  top: 0;
  left: 600px;
  background-color: #c70039;
`;
const R1C8 = styled(SDiv)`
  top: 0;
  left: 700px;
  background-color: #ffc300;
`;
