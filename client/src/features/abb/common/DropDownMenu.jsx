import React, { useState } from 'react';

import { msgFormatter } from 'app/util';
import styled from 'styled-components';
import { handleColorType } from 'wwwroot/feature/common/StyleColorType';

const DropDownMenu = ({
  innerRef,
  isMenuEnabled,
  items,
  position = 'auto',
  status,
  title,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const resolvedWidth = width || '150px';

  return (
    <WrapperDiv>
      {isMenuEnabled ? (
        <a onClick={handleToggleMenu}>
          <TitleSpan $status={status}>{title}</TitleSpan>
          <IconSpan>
            {isOpen ? (
              <i className="fa fa-caret-up collapse-icon" />
            ) : (
              <i className="fa fa-caret-down collapse-icon" />
            )}
          </IconSpan>
        </a>
      ) : (
        <TitleSpan $status={status}>{title}</TitleSpan>
      )}
      {isOpen ? (
        <BoxDiv
          ref={innerRef}
          $width={resolvedWidth}
          aria-label={msgFormatter('menu')()}
          tabIndex="-1"
          $position={position}
          role="menu"
        >
          {items.map((item) =>
            item.isEnabled ? (
              <ItemDiv
                key={item.title}
                // eslint-disable-next-line react/jsx-handler-names
                onClick={item.onClick}
              >
                {item.title}
              </ItemDiv>
            ) : null,
          )}
        </BoxDiv>
      ) : null}
    </WrapperDiv>
  );
};

export default DropDownMenu;

const WrapperDiv = styled.div`
  position: relative;
  a:hover {
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;
const TitleSpan = styled.span`
  color: ${(props) => handleColorType(props.$status)};
`;
const IconSpan = styled.span`
  margin-left: 5px;
`;
const BoxDiv = styled.div`
  z-index: 1;
  background: white;
  border: 1px solid rgb(202, 205, 208);
  display: block;
  position: fixed;
  left: ${({ $position }) => ($position === 'left' ? '0' : 'auto')};
  right: ${({ $position }) => ($position === 'right' ? '0' : 'auto')};
  transition: transform 0.2s;
  width: ${({ $width }) => $width};
  padding: 5px;
`;
const ItemDiv = styled.div`
  text-wrap: nowrap;
  white-space: nowrap;
`;
