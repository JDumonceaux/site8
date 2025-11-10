import React from 'react';

import { msgFormatter } from 'app/util';
import Tooltip from 'empower-components/Tooltip';
import DateForm from './DateForm';

const SubmitDate = ({ ...rest }) => {
  return (
    <DateForm
      required
      extra={
        <Tooltip title={msgFormatter('submitDateTooltip')()}>
          <i className="fal fa-paperclip" />
        </Tooltip>
      }
      label={msgFormatter('submitDate')()}
      {...rest}
    />
  );
};

export default SubmitDate;
