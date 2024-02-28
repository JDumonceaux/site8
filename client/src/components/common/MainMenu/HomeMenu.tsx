import { styled } from 'styled-components';

import CustomNavLink from '../../ui/CustomNavLink';
import useMenu from 'services/hooks/useMenu';

const menuItems = [
  {
    parent: 'Me Stuff',
    items: [
      {
        to: '/other/art',
        label: 'Art',
      },
      {
        to: '/other/artists/kelly-boesch',
        label: 'Kelly Boesch',
      },
      {
        to: '/other/artists/shag',
        label: 'Shag',
      },
      {
        to: '/other/photography',
        label: 'Photography',
      },
      {
        to: '/other/resources',
        label: 'Resources',
      },
      {
        to: '/other/yachts',
        label: 'Yachts',
      },
      {
        to: '/other/videos/you-tube',
        label: 'YouTube Videos',
      },
      {
        to: '/other/puzzles',
        label: 'Puzzles - Lazel',
      },
      {
        to: '/other/puzzles2',
        label: 'Puzzles - The Puzzle Lab',
      },
      {
        id: 3001,
        to: '/other/at-last',
        label: 'At Last - Pleasantville',
      },
      {
        id: 3002,
        to: '/other/gallos',
        label: 'Gallos',
      },
      {
        id: 3003,
        to: '/other/shoes-on-the-danube-bank',
        label: 'Shoes on the Danube Bank',
      },
    ],
  },
  {
    parent: 'React',
    items: [
      {
        id: 2001,
        to: '/ide/chrome-extensions',
        label: 'Chrome Extensions',
      },
      {
        id: 2002,
        to: '/ide/git',
        label: 'GIT',
      },
      {
        id: 2003,
        to: '/ide/vsc',
        label: 'Visual Studio Code',
      },
      {
        id: 2004,
        to: '/ide/vsc/extensions',
        label: 'Visual Studio Code: Extensions',
      },
    ],
  },
];

export const HomeMenu = (): JSX.Element => {
  const { data } = useMenu();

  console.log('data', data);

  return (
    <StyledNav>
      <StyledGrid>
        {menuItems.map((item) => (
          <StyledMenuSection key={item.parent}>
            <StyledMenuTitle>{item.parent}</StyledMenuTitle>
            {item.items.map((x) => (
              <CustomNavLink key={x.label} to={x.to}>
                {x.label}
              </CustomNavLink>
            ))}
          </StyledMenuSection>
        ))}
      </StyledGrid>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  color: #fff;
`;
const StyledGrid = styled.div`
  column-count: 4;
  column-gap: 16px;
`;
const StyledMenuSection = styled.div`
  break-inside: avoid;
  margin-bottom: 18px;
  & a {
    color: white;
    font-size: 0.8rem;
    display: block;
    display: block;
    text-decoration: none;
    padding: 3px 0px;
  }
`;
const StyledMenuTitle = styled.div`
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding-bottom: 3px;
  margin-bottom: 6px;
`;
