import React, { memo } from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';

import FieldMargin from './FieldMargin';
import Label from './Label';

const OpportunityLabel = ({ margin, show = true, value }) => {
  if (!show) {
    return null;
  }

  return (
    <FieldMargin margin={margin}>
      <Label label={msgFormatter('opportunity')()}>{value}</Label>
    </FieldMargin>
  );
};

OpportunityLabel.propTypes = {
  margin: PropTypes.string,
  show: PropTypes.bool,
  value: PropTypes.string,
};

OpportunityLabel.displayName = 'OpportunityLabel';

export default memo(OpportunityLabel);
