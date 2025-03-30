import { Fragment, useEffect, useState } from 'react';

import styled from 'styled-components';
// import gsap from 'gsap';
// https://codesandbox.io/p/sandbox/semi-circle-animation-20otz8?file=%2Fsrc%2FApp.js%3A1%2C1-105%2C1

const HomeScreen3 = () => {
  const [semiCircles, setSemiCircles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (semiCircles.length > 0) {
      //   gsap.to('.spacer', {
      //     delay: 1,
      //     duration: 1,
      //     stagger: 0.1,
      //     ease: 'power3.inOut',
      //     width: 0,
      //   });
    }
  }, [semiCircles]);

  useEffect(() => {
    const items: React.ReactNode[] = [];
    let i = 0;

    while (i * 150 < window.innerWidth) {
      items.push(
        <Fragment key={i}>
          <Spacer />
          <SemiCircle />
        </Fragment>,
      );

      i += 1;
    }

    setSemiCircles(items);
  }, [setSemiCircles]);

  return (
    <Wrapper>
      <Mask />
      <Track>{semiCircles}</Track>
      <BottomMask />
    </Wrapper>
  );
};

export default HomeScreen3;

const Wrapper = styled.div`
  position: relative;
  background-color: #020207;
  background-image: url('/hero-desktop.webp');
  background-position: center;
  background-size: contain;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
`;

const Track = styled.div`
  position: absolute;
  z-index: 2;
  height: 300px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  min-width: 100%;
  display: flex;
`;

const Spacer = styled.div`
  background-color: #020207;

  height: 100%;
  width: ${window.innerWidth}px;
`;

const SemiCircle = styled.div`
  background-color: blue;

  background: radial-gradient(
    circle at 100%,
    rgba(2, 2, 7, 0) 0,
    rgba(2, 2, 7, 0) 150px,
    rgba(2, 2, 7, 1) 150px,
    rgba(2, 2, 7, 1) 300px
  );

  height: 300px;
  width: 150px;
`;

const Mask = styled.div`
  position: absolute;
  height: calc(50% - 150px);
  background-color: #020207;
  top: 0;
  left: 0;
  width: 100%;
`;

const BottomMask = styled(Mask)`
  top: unset;
  bottom: 0;
`;
