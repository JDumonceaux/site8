import React from 'react';

import Tooltip from 'empower-components/Tooltip';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { handleColorType } from './StyleColorType';

// Wraps the empower Tooltip component with icon and status color handling
const ToolTipIcon = ({ children, icon, status, title }) => {
  if (!title) {
    return null;
  }

  const defaultIcon = (() => {
    switch (icon) {
      case 'exclamation': {
        return <i className="fal fa-exclamation" />;
      }
      case 'exclamation-circle': {
        return <i className="fal fa-exclamation-circle" />;
      }
      case 'eye': {
        return <i className="fal fa-eye" />;
      }
      case 'government': {
        return <i className="fas fa-file-certificate" />;
      }
      case 'info-circle': {
        return <i className="fal fa-info-circle" />;
      }
      case 'locked': {
        return <i className="far fa-lock" />;
      }
      case 'pen-circle': {
        return <i className="fal fa-pen-circle" />;
      }
      case 'snapshot': {
        return <i className="fa fa-camera" />;
      }
      case 'us-flag': {
        return <i className="fas fa-flag-usa" />;
      }
      case 'view-only': {
        return <i className="far fa-eye" />;
      }
      default: {
        return null;
      }
    }
  })();

  return (
    <StyledToolTip
      $status={status}
      title={title}
    >
      {defaultIcon}
      {children}
    </StyledToolTip>
  );
};

ToolTipIcon.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOf([
    'exclamation',
    'exclamation-circle',
    'eye',
    'government',
    'info-circle',
    'locked',
    'pen-circle',
    'snapshot',
    'us-flag',
    'view-only',
  ]),
  status: PropTypes.string,
  title: PropTypes.string,
};

ToolTipIcon.displayName = 'ToolTipIcon';
export default ToolTipIcon;

const StyledToolTip = styled(Tooltip)`
  color: ${(props) => handleColorType(props.$status)};
  min-width: 15px;
`;
