import React, { useMemo } from "react";

import SlideoutMenu from "empower-components/SlideoutMenu";
import styled from "styled-components";
import IconsMenu from "wwwroot/feature/common/menus/iconsMenu/IconsMenu";

const ActionsMenu = ({ items }) => {
    // Validate and filter items
    const validItems = useMemo(() => {
        if (!Array.isArray(items)) {
            console.warn('ActionsMenu: items prop should be an array');
            return [];
        }
        
        return items.filter(item => {
            if (!item || typeof item !== 'object') {
                console.warn('ActionsMenu: Invalid item in items array', item);
                return false;
            }
            return true;
        });
    }, [items]);

    if (validItems.length === 0) {
        return null;
    }

    return (
      <WrapperDiv>
        <StyledMenu>
          <SlideoutMenu>
            {/* Note: SlideoutMenu already includes a UL wrappper, so includeUL is set to false. */}
            <IconsMenu
              includeLI
              includeUL={false}
              items={validItems}
            />
          </SlideoutMenu>
        </StyledMenu>
      </WrapperDiv>
    );
};

export default ActionsMenu;

const StyledMenu = styled.div`
    li {
        justify-content: normal !important;
    }
    div[role="menu"] {
        padding: 5px;
        li {
            display: list-item;
            width: 100%;
        }
    }
`;
const WrapperDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`;
