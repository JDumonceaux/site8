import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { msgFormatter } from 'app/util';
import Tooltip from 'empower-components/Tooltip';
import DateForm from './DateForm';

// SubmitDate: Date input with tooltip for submit date
const SubmitDate = (rest) => (
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

SubmitDate.propTypes = {
  // Accept any props passed to DateForm
};

SubmitDate.displayName = 'SubmitDate';

export default memo(SubmitDate);
