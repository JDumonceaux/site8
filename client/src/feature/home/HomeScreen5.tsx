import Layout from 'components/layouts/Layout/Layout';
import HomeMenu from 'feature/home/HomeMenu';

import CircleAnimation from './Animations/CircleAnimation';
import CircleMenuAnimation from './Animations/CircleMenuAnimation';
import TitleAnimation from './Animations/TitleAnimation';

const HomeScreen5 = (): React.JSX.Element => {
  return (
    <Layout.FullWidth>
      <TitleAnimation />
      <CircleMenuAnimation />
      <CircleAnimation />
      <HomeMenu />
    </Layout.FullWidth>
  );
};

export default HomeScreen5;
