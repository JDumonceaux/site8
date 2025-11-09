import React from 'react';

import IconsMenu, {
  MenuItemType,
} from 'wwwroot/feature/common/menus/iconsMenu/IconsMenu';

const ViewMenu = ({ hasFilter, onShowFilter }) => {
  const menuItems = [
    {
      isActive: hasFilter,
      onClick: onShowFilter,
      type: MenuItemType.Filter,
    },
  ];

  return <IconsMenu items={menuItems} />;
};

export default ViewMenu;
