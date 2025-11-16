import React, { memo } from 'react';

import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import PropTypes from 'prop-types';

import FieldMargin from './FieldMargin';

const PONumber = ({ margin, onChange, show = true, value, ...rest }) => {
  if (!show) {
    return null;
  }

  return (
    <FieldMargin margin={margin}>
      <InputForm
        required
        handleChange={onChange}
        id="po_number"
        inputText={value}
        label={msgFormatter('poNumber')()}
        maxLength={35}
        {...rest}
      />
    </FieldMargin>
  );
};

PONumber.propTypes = {
  margin: PropTypes.string,
  onChange: PropTypes.func,
  show: PropTypes.bool,
  value: PropTypes.string,
};

PONumber.displayName = 'PONumber';

export default memo(PONumber);
