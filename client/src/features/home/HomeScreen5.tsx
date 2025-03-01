import Layout from 'components/layouts/Layout/Layout';
import HomeMenu from 'features/home/HomeMenu';

import CircleAnimation from './Animations/CircleAnimation';
import CircleMenuAnimation from './Animations/CircleMenuAnimation';
import TitleAnimation from './Animations/TitleAnimation';
import React, { memo } from 'react';

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

export default HomeScreen5;
