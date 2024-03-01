import useMenu from 'services/hooks/useMenu';
import CustomNavLink from '../../ui/CustomNavLink';
import { AccordionMenu } from './AccordionMenu';

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
            <CustomNavLink key={x.name} to={`/${item.url}/${x.url}`}>
              {x.name}
            </CustomNavLink>
          ))}
        </AccordionMenu>
      ))}
    </div>
  );
};
