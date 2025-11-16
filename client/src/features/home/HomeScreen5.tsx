import type { JSX } from 'react';

import HomeMenu from '@features/home/HomeMenu';
import Layout from '@features/layouts/Layout/Layout';
import styled from 'styled-components';
import CircleAnimation from './animations/CircleAnimation';
import CircleMenuAnimation from './animations/CircleMenuAnimation';
import TitleAnimation from './animations/TitleAnimation';

// Use named const arrow function with explicit return type
export const HomeScreen5 = (): JSX.Element | null => (
  <Layout.FullWidth>
    <ContainerDiv>
      <TitleAnimation />
      <CircleMenuAnimation />
      <CircleAnimation />
    </ContainerDiv>
    <HomeMenu />
  </Layout.FullWidth>
);

HomeScreen5.displayName = 'HomeScreen5';
export default HomeScreen5;

const ContainerDiv = styled.div`
  height: 100vh;
`;
