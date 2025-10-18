import React from 'react';
import Article from './Article';
import Aside from './Aside';
import Content from './Content';
import Flex from './Flex';
import FullWidth from './FullWidth';
import Main from './Main';
import Menu from './Menu';
import Section from './Section';
import TitleFixed from './TitleFixed';

interface LayoutComponent extends React.FC {
  Article: typeof Article;
  Aside: typeof Aside;
  Content: typeof Content;
  Flex: typeof Flex;
  FullWidth: typeof FullWidth;
  Main: typeof Main;
  Menu: typeof Menu;
  Section: typeof Section;
  TitleFixed: typeof TitleFixed;
}

const Layout: LayoutComponent = (): React.ReactElement => <>Not defined</>;

Layout.Article = Article;
Layout.Aside = Aside;
Layout.Content = Content;
Layout.Flex = Flex;
Layout.FullWidth = FullWidth;
Layout.Main = Main;
Layout.Menu = Menu;
Layout.Section = Section;
Layout.TitleFixed = TitleFixed;

export default Layout;
