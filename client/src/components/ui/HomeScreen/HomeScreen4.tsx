import { styled, keyframes } from 'styled-components';

export function HomeScreen4(): JSX.Element {
  const myArr = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <StyledSection>
      {myArr.map((item, index) => (
        <WhiteDiv key={item} $left={400 + index * 10} />
      ))}
      <GrayDiv $left={610} />
      <LargePinkCircle />
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
}

const StyledSection = styled.section`
  width: 100%;
`;

const WhiteDiv = styled.div<{ $left: number }>`
  position: fixed;
  top: 350px;
  left: ${(props) => (props.$left ? props.$left : '0')}px;
  width: 5px;
  height: 60px;
  background-color: #fff;
`;
const GrayDiv = styled.div<{ $left: number }>`
  position: fixed;
  top: 150px;
  left: ${(props) => (props.$left ? props.$left : '0')}px;
  width: 8px;
  height: 500px;
  background-color: #a9a9a9;
  z-index: 1;
`;
const LargePinkCircle = styled.div`
  position: fixed;
  top: 430px;
  left: 350px;
  height: 240px;
  width: 480px;
  border-radius: 0 0 240px 240px;
  background-color: #b48484;
  z-index: 0;
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
