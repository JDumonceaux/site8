import React from 'react';

import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import FieldMargin from './FieldMargin';

const PONumber = ({ margin, onChange, show, value, ...rest }) => {
  if (!show) return null;

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

export default PONumber;
