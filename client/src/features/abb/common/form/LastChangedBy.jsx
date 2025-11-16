import React, { memo } from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';

import GridNameDate from '../tables/GridNameDate';
import FieldMargin from './FieldMargin';
import Label from './Label';

const LastChangedBy = ({ margin, quote, ...rest }) => (
  <FieldMargin margin={margin}>
    <Label
      label={msgFormatter('createdBy')()}
      {...rest}
    />
    <GridNameDate type="modifiedInfo">{quote}</GridNameDate>
  </FieldMargin>
);

LastChangedBy.propTypes = {
  margin: PropTypes.string,
  quote: PropTypes.shape({
    ModifiedBySSO: PropTypes.string,
    ModifiedDate: PropTypes.string,
    ModifiedEmail: PropTypes.string,
    ModifiedName: PropTypes.string,
    ModifiedUser: PropTypes.string,
  }),
};

LastChangedBy.displayName = 'LastChangedBy';

export default memo(LastChangedBy);
