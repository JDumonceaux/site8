import StyledMain from 'components/common/StyledMain/StyledMain';
import HomeMenu from 'components/pages/HomePage/HomeMenu';
import CircleAnimation from './Animations/CircleAnimation';
import CircleMenuAnimation from './Animations/CircleMenuAnimation';
import TitleAnimation from './Animations/TitleAnimation';

const HomeScreen5 = (): JSX.Element => {
  return (
    <StyledMain.FullWidth>
      <StyledMain.PageSection>
        <TitleAnimation />
        <CircleMenuAnimation />
        <CircleAnimation />
      </StyledMain.PageSection>
      <StyledMain.PageSection>
        <HomeMenu />
      </StyledMain.PageSection>
    </StyledMain.FullWidth>
  );
};

export default HomeScreen5;