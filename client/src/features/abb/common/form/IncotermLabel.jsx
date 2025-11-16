import React, { memo } from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';

import FieldMargin from './FieldMargin';
import Label from './Label';

const IncotermLabel = ({ margin, value }) => (
  <FieldMargin margin={margin}>
    <Label label={msgFormatter('incoTermsLabel')()}>{value}</Label>
  </FieldMargin>
);

IncotermLabel.propTypes = {
  margin: PropTypes.string,
  value: PropTypes.string,
};

IncotermLabel.displayName = 'IncotermLabel';

export default memo(IncotermLabel);
