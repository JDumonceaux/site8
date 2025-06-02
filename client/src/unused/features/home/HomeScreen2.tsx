import type { JSX } from 'react';
import Meta from 'components/core/Meta/Meta';
import Layout from 'features/layouts/Layout/Layout';
import { keyframes, styled } from 'styled-components';

const HomeScreen2 = (): JSX.Element | null => {
  const title = 'Home';

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <section>
          <R1C1 />
          <R1C2 />
          <R1C3 />
          <R1C4 />
          <R1C5 />
          <R1C6 />
          <R1C7 />
          <R1C8 />
        </section>
      </Layout.Main>
    </>
  );
};

HomeScreen2.displayName = 'HomeScreen2';
export default HomeScreen2;

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
  background-color:rgb(29, 27, 22);
`;
