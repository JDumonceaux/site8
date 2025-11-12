import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { handleColorType } from './StyleColorType';

const StyledIcon = ({ icon, status, title }) => {
  if (!title) {
    return null;
  }

  const iconClass = (() => {
    switch (icon) {
      case 'exclamation': {
        return 'fal fa-exclamation';
      }
      case 'exclamation-circle': {
        return 'fal fa-exclamation-circle';
      }
      case 'eye': {
        return 'fal fa-eye';
      }
      case 'government': {
        return 'fas fa-file-certificate';
      }
      case 'info-circle': {
        return 'fal fa-info-circle';
      }
      case 'pen-circle': {
        return 'fal fa-pen-circle';
      }
      case 'us-flag': {
        return 'fas fa-flag-usa';
      }
      default: {
        throw new Error(`Unknown icon type: ${icon}`);
      }
    }
  })();

  return (
    <StyledItem
      $status={status}
      className={iconClass}
      title={title}
    />
  );
};

StyledIcon.propTypes = {
  icon: PropTypes.oneOf([
    'exclamation',
    'exclamation-circle',
    'eye',
    'government',
    'info-circle',
    'pen-circle',
    'us-flag',
  ]),
  status: PropTypes.string,
  title: PropTypes.string,
};

StyledIcon.displayName = 'StyledIcon';
export default StyledIcon;

const StyledItem = styled.i`
  color: ${(props) => handleColorType(props.$status)};
  min-width: 15px;
`;
