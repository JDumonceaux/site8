import React, { memo } from 'react';

import { msgFormatter } from 'app/util';

import DateForm from './DateForm';

const DueDate = ({ ...rest }) => (
  <DateForm
    required
    label={msgFormatter('dueDate')()}
    {...rest}
  />
);

DueDate.displayName = 'DueDate';

export default memo(DueDate);
