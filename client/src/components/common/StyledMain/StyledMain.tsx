import { styled } from 'styled-components';

import StyledArticle from './StyledArticle';
import StyledAside from './StyledAside';
import StyledFullWidth from './StyledFullWidth';
import StyledMenu from './StyledMenu';
import StyledPageSection from './StyledPageSection';
import StyledSection from './StyledSection';

type Props = {
  readonly children: React.ReactNode;
};

const StyledMain = ({ children }: Props): JSX.Element => {
  return <StyledElement data-testid="main">{children}</StyledElement>;
};

StyledMain.Menu = StyledMenu;
StyledMain.Article = StyledArticle;
StyledMain.Aside = StyledAside;
StyledMain.Section = StyledSection;
StyledMain.FullWidth = StyledFullWidth;
StyledMain.PageSection = StyledPageSection;

export default StyledMain;

const StyledElement = styled.main`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
`;
