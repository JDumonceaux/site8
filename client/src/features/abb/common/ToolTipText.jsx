import React from 'react';

import Tooltip from 'empower-components/Tooltip';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { handleColorType } from './StyleColorType';

const ToolTipText = ({ children, status, title }) => {
  if (!children) {
    return null;
  }

  return (
    <StyledToolTip
      $status={status}
      title={title}
    >
      {children}
    </StyledToolTip>
  );
};

ToolTipText.propTypes = {
  children: PropTypes.node,
  status: PropTypes.string,
  title: PropTypes.string,
};

ToolTipText.displayName = 'ToolTipText';
export default ToolTipText;

const StyledToolTip = styled(Tooltip)`
  color: ${(props) => handleColorType(props.$status)};
  min-width: 15px;
`;
