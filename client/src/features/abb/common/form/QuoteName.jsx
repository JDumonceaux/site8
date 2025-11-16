import React, { memo } from 'react';

import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import PropTypes from 'prop-types';

import FieldMargin from './FieldMargin';

const QuoteName = ({ margin, onChange, value, ...rest }) => (
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

QuoteName.propTypes = {
  margin: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

QuoteName.displayName = 'QuoteName';

export default memo(QuoteName);
