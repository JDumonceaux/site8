import React from 'react';

import { msgFormatter } from 'app/util';
import Toggle from 'empower-components/Toggle';
import Tooltip from 'empower-components/Tooltip';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToggleOption = ({ item }) => {
  // Fill in any missing or undefined properties
  const modifiedItem = {
    ...item,
    isEnabled: item.isEnabled === undefined ? true : item.isEnabled,
    show: item.show === undefined ? true : item.show,
  };

  if (!modifiedItem || !modifiedItem.show) {
    return null;
  }

  return (
    <ToggleDiv>
      <Toggle
        handleChange={() => {
          modifiedItem.onChange(modifiedItem.id);
        }}
        labelText={
          <>
            {modifiedItem.path
              ? msgFormatter(modifiedItem.path)()
              : modifiedItem.text}
            {modifiedItem.infoIcon ? (
              <Tooltip title={modifiedItem.infoIcon}>
                <i className="fal fa-info-circle" />
              </Tooltip>
            ) : (
              ''
            )}
          </>
        }
        active={modifiedItem.value}
        disabled={!modifiedItem.isEnabled}
        id={`${modifiedItem.id}`}
      />
    </ToggleDiv>
  );
};

ToggleOption.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    infoIcon: PropTypes.string,
    isEnabled: PropTypes.bool,
    onChange: PropTypes.func,
    path: PropTypes.string,
    show: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.bool,
  }),
};

export default ToggleOption;

const ToggleDiv = styled.div`
  > div:first-child {
    justify-content: space-between;
  }
  margin-bottom: 10px;
  i {
    margin-left: 5px;
  }
`;
