import { HomeMenu } from 'components/common/Menu/MainMenu/HomeMenu';

import StyledMain from 'components/common/StyledMain';
import { CircleAnimation } from './Animations/CircleAnimation';
import { CircleMenuAnimation } from './Animations/CircleMenuAnimation';
import { TitleAnimation } from './Animations/TitleAnimation';

export const HomeScreen5 = (): JSX.Element => {
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
