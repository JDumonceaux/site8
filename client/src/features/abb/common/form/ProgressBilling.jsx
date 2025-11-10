import React from 'react';

import { msgFormatter } from 'app/util';
import CheckboxForm from './CheckboxForm';
import FieldMargin from './FieldMargin';

const ProgressBilling = ({ checked, margin, onSelect, show, ...rest }) => {
  if (!show) return null;

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

export default ProgressBilling;
