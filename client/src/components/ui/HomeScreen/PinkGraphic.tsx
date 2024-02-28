import { styled, keyframes } from 'styled-components';

export const PinkGraphic = (): JSX.Element => {
  const myArr20 = Array.from({ length: 20 }, (_, index) => index + 1);
  const myArr36 = Array.from({ length: 36 }, (_, index) => index + 1);
  // eslint-disable-next-line immutable/no-let
  let x = -1;
  // eslint-disable-next-line immutable/no-let
  let y = 0;

  return (
    <StyledDiv>
      {myArr20.map((item, index) => (
        <WhiteLine $index={index} key={item} />
      ))}
      <GenLineAnim
        $color="#808080"
        $height={350}
        $left={-120}
        $top={-250}
        $width={8}
        $z={2}
      />
      <GenLineAnim
        $boxShadow
        $color="#303030"
        $height={400}
        $left={-80}
        $top={-150}
        $width={16}
        $z={2}
      />
      <GenLine
        $boxShadow
        $color="#9d6060"
        $height={140}
        $left={-75}
        $top={-70}
        $width={32}
        $z={2}
      />
      <GenLine
        $boxShadow
        $color="#fff"
        $height={50}
        $left={-50}
        $top={-20}
        $width={15}
        $z={3}
      />
      <GenLine
        $color="#fff"
        $height={150}
        $left={0}
        $top={-150}
        $width={240}
        $z={3}
      />
      <GenLine
        $boxShadow
        $color="#9d6060"
        $height={400}
        $left={11}
        $top={-270}
        $width={4}
        $z={3}
      />
      <GenLine
        $boxShadow
        $color="#9d6060"
        $height={400}
        $left={20}
        $top={-270}
        $width={6}
        $z={3}
      />
      <DiagLine
        $boxShadow
        $color="#808080"
        $height={100}
        $left={75}
        $top={-90}
        $width={8}
        $z={3}
      />
      <DiagLine
        $boxShadow
        $color="#808080"
        $height={100}
        $left={75}
        $top={-110}
        $width={8}
        $z={3}
      />
      <DiagLine
        $boxShadow
        $color="#808080"
        $height={100}
        $left={75}
        $top={-130}
        $width={8}
        $z={3}
      />
      <DiagLine
        $boxShadow
        $color="#808080"
        $height={100}
        $left={75}
        $top={-150}
        $width={8}
        $z={3}
      />
      <LargePinkCircle />
      <LargeGrayTriangle />
      {myArr36.map((item) => {
        x += 1;
        if (x > 5) {
          x = 0;
          y += 1;
        }
        return <GrayDots $left={x} $top={y} key={item} />;
      })}
      {myArr36.map((item) => {
        x += 1;
        if (x > 5) {
          x = 0;
          y += 1;
        }
        return <PinkDots $left={x} $top={y} key={item} />;
      })}
    </StyledDiv>
  );
};

const CENTER_TOP = '30dvh';
const CENTER_LEFT = '75dvw';

const StyledDiv = styled.div`
  perspective: 100px;
`;
const WhiteLine = styled.div<{ $index: number }>`
  --space: ${(props) => props.$index * 12 + 'px'};
  position: fixed;
  top: calc(${CENTER_TOP} - 60px);
  left: calc(${CENTER_LEFT} - 150px - var(--space));
  width: 5px;
  height: 50px;
  background-color: #fff;
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
  top: ${CENTER_TOP};
  left: ${CENTER_LEFT};
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
  top: calc(${CENTER_TOP} - 150px);
  left: ${CENTER_LEFT};
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

const GenLine = styled.div<{
  $left: number;
  $top: number;
  $height: number;
  $width: number;
  $color: string;
  $z: number;
  $boxShadow?: boolean;
}>`
  --top: ${(props) => props.$top + 'px'};
  --left: ${(props) => props.$left + 'px'};
  position: fixed;
  top: calc(${CENTER_TOP} + ${(props) => props.$top + 'px'});
  left: calc(${CENTER_LEFT} + var(--left));
  height: ${(props) => props.$height + 'px'};
  width: ${(props) => props.$width + 'px'};
  background-color: ${(props) => props.$color};
  z-index: ${(props) => props.$z};
  box-shadow: ${(props) =>
    props.$boxShadow ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : 'none'};
`;
const GenLineAnim = styled(GenLine)`
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.9, 1);
  animation-name: ${lpcAnimation2};
`;

const DiagLine = styled(GenLine)`
  transform: rotate(-45deg);
  -webkit-box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
`;

const GrayDots = styled.div<{ $left: number; $top: number }>`
  --top: ${(props) => props.$top * 20 + 'px'};
  --left: ${(props) => props.$left * 20 + 'px'};
  position: fixed;
  top: calc(${CENTER_TOP} + var(--top) + 20px);
  left: calc(${CENTER_LEFT} - 240px + var(--left));
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #808080;
  z-index: 2;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;
const PinkDots = styled.div<{ $left: number; $top: number }>`
  --top: ${(props) => props.$top * 10 + 'px'};
  --left: ${(props) => props.$left * 10 + 'px'};
  position: fixed;
  top: calc(${CENTER_TOP} + var(--top) + 20px);
  left: calc(${CENTER_LEFT} + var(--left) + 80px);
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: #9d6060;
  z-index: 4;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;
