import useMenu from 'hooks/useMenu';
import { AccordionMenu } from './AccordionMenu';
import StyledNavLink from 'components/common/Link/StyledNavLink/StyledNavLink';

export const MainMenu = (): JSX.Element => {
  const { data } = useMenu();

  return (
    <div>
      {data?.items?.map((item) => (
        <AccordionMenu
          id={item.id}
          key={item.id}
          path={`/${item.url}`}
          title={item.name}>
          {item?.items?.map((x) => (
            <StyledNavLink key={x.name} to={`/${item.url}/${x.url}`}>
              {x.name}
            </StyledNavLink>
          ))}
        </AccordionMenu>
      ))}
    </div>
  );
};
