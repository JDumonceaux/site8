import React from 'react';

import { msgFormatter } from 'app/util';
import DateForm from './DateForm';

const DueDate = ({ ...rest }) => {
  return (
    <DateForm
      required
      label={msgFormatter('dueDate')()}
      {...rest}
    />
  );
};

export default DueDate;
