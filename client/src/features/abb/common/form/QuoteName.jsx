import React from 'react';

import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import FieldMargin from './FieldMargin';

const QuoteName = ({ margin, onChange, value, ...rest }) => {
  return (
    <FieldMargin margin={margin}>
      <InputForm
        required
        handleChange={onChange}
        id="quote_name"
        inputText={value}
        label={msgFormatter('quoteName')()}
        maxLength={50}
        {...rest}
      />
    </FieldMargin>
  );
};

export default QuoteName;
