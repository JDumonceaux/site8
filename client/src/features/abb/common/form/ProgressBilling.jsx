import React, { memo } from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';

import CheckboxForm from './CheckboxForm';
import FieldMargin from './FieldMargin';

const ProgressBilling = ({
  checked,
  margin,
  onSelect,
  show = true,
  ...rest
}) => {
  if (!show) {
    return null;
  }

  return (
    <FieldMargin margin={margin}>
      <CheckboxForm
        required
        checked={checked}
        id="progress_billing"
        label={msgFormatter('progressBilling')()}
        onSelect={onSelect}
        {...rest}
      />
    </FieldMargin>
  );
};

ProgressBilling.propTypes = {
  checked: PropTypes.bool,
  margin: PropTypes.string,
  onSelect: PropTypes.func,
  show: PropTypes.bool,
};

ProgressBilling.displayName = 'ProgressBilling';

export default memo(ProgressBilling);
