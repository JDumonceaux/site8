
import HomeMenu from 'components/pages/HomePage/HomeMenu';
import CircleAnimation from './Animations/CircleAnimation';
import CircleMenuAnimation from './Animations/CircleMenuAnimation';
import TitleAnimation from './Animations/TitleAnimation';

const HomeScreen5 = (): JSX.Element => {
  return (
    <Layout.FullWidth>
      <Layout.PageSection>
        <TitleAnimation />
        <CircleMenuAnimation />
        <CircleAnimation />
      </Layout.PageSection>
      <Layout.PageSection>
        <HomeMenu />
      </Layout.PageSection>
    </Layout.FullWidth>
  );
};

export default HomeScreen5;
