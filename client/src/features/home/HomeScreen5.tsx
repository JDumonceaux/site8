import type { JSX } from 'react';

import HomeMenu from '@features/home/HomeMenu';
import Layout from '@features/layouts/layout-temp/Layout';
import CircleAnimation from './animations-temp/CircleAnimation';
import CircleMenuAnimation from './animations-temp/CircleMenuAnimation';
import TitleAnimation from './animations-temp/TitleAnimation';
import styled from 'styled-components';

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
