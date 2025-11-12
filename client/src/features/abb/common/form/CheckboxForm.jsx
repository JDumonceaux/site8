import React from 'react';

import Checkbox from 'empower-components/Checkbox';
import PropTypes from 'prop-types';
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

CheckboxForm.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  required: PropTypes.bool,
};

export default CheckboxForm;
