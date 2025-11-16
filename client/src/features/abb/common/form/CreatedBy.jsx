import React, { memo } from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';

import GridNameDate from '../tables/GridNameDate';
import FieldMargin from './FieldMargin';
import Label from './Label';

const CreatedBy = ({ margin, quote, ...rest }) => (
  <FieldMargin margin={margin}>
    <Label
      label={msgFormatter('createdBy')()}
      {...rest}
    />
    <GridNameDate type="createdInfo">{quote}</GridNameDate>
  </FieldMargin>
);

CreatedBy.propTypes = {
  margin: PropTypes.string,
  quote: PropTypes.shape({
    CreatedBySSO: PropTypes.string,
    CreatedDate: PropTypes.string,
    CreatedEmail: PropTypes.string,
    CreatedName: PropTypes.string,
    CreatedUser: PropTypes.string,
  }),
};

CreatedBy.displayName = 'CreatedBy';

export default memo(CreatedBy);
