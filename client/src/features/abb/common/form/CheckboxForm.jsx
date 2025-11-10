import React from 'react';

import Checkbox from 'empower-components/Checkbox';
import FieldWrapper from './FieldWrapper';

const CheckboxForm = ({
  checked,
  id,
  label,
  onSelect,
  required = false,
  ...rest
}) => {
  return (
    <FieldWrapper required={required}>
      <Checkbox
        checked={checked}
        handleSelect={onSelect}
        id={id}
        label={label}
        {...rest}
      />
    </FieldWrapper>
  );
};

export default CheckboxForm;
