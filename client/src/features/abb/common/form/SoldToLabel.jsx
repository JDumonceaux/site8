import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { msgFormatter } from 'app/util';
import Tooltip from 'empower-components/Tooltip';
import FieldMargin from './FieldMargin';
import Label from './Label';

// SoldToLabel: Displays Sold-To label with tooltip and value
const SoldToLabel = ({ margin, value }) => (
  <FieldMargin margin={margin}>
    <Label
      label={msgFormatter('accountManagerSoldToAccount')()}
      endAdornment={
        <Tooltip title={msgFormatter('amSoldToAccountToolTip')()}>
          <i className="fal fa-question-circle" />
        </Tooltip>
      }
    >
      {value}
    </Label>
  </FieldMargin>
);

SoldToLabel.propTypes = {
  margin: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SoldToLabel.displayName = 'SoldToLabel';

export default memo(SoldToLabel);
