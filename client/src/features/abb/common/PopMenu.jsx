import React from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// This is a small, hidden menu usually associated with a tag icon.
const PopMenu = ({
  children,
  innerRef,
  isShown = true,
  position = 'right',
  width,
}) => {
  const resolvedWidth = width || '125px';

  if (!isShown) {
    return null;
  }

  return (
    <BoxDiv
      ref={innerRef}
      $width={resolvedWidth}
      aria-label={msgFormatter('menu')()}
      tabIndex="-1"
      $position={position}
      role="menu"
    >
      {children}
    </BoxDiv>
  );
};

PopMenu.propTypes = {
  children: PropTypes.node,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  isShown: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  width: PropTypes.string,
};

PopMenu.displayName = 'PopMenu';
export default PopMenu;

const BoxDiv = styled.div`
  z-index: 1;
  background: white;
  border: 1px solid rgb(202, 205, 208);
  display: block;
  position: absolute;
  left: ${({ $position }) => ($position === 'left' ? '0' : 'auto')};
  right: ${({ $position }) => ($position === 'right' ? '0' : 'auto')};
  transition: transform 0.2s;
  width: ${({ $width }) => $width};
  padding: 10px;
`;
