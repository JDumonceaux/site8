import React, { memo } from 'react';

import Layout from 'components/layouts/Layout/Layout';
import HomeMenu from 'features/home/HomeMenu';

import CircleAnimation from './Animations/CircleAnimation';
import CircleMenuAnimation from './Animations/CircleMenuAnimation';
import TitleAnimation from './Animations/TitleAnimation';

const HomeScreen5 = memo((): React.JSX.Element => {
  return (
    <Layout.FullWidth>
      <TitleAnimation />
      <CircleMenuAnimation />
      <CircleAnimation />
      <HomeMenu />
    </Layout.FullWidth>
  );
});

HomeScreen5.displayName = 'HomeScreen5';

export default HomeScreen5;
