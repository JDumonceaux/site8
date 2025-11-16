import React, { memo } from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';

import FieldMargin from './FieldMargin';
import NumberForm from './NumberForm';

const POValue = ({ margin, onChange, show = true, ...rest }) => {
  if (!show) {
    return null;
  }

  return (
    <FieldMargin margin={margin}>
      <NumberForm
        handleChange={onChange}
        id="po_value"
        label={msgFormatter('poValue')()}
        mDec={2}
        vMin={0}
        {...rest}
      />
    </FieldMargin>
  );
};

POValue.propTypes = {
  margin: PropTypes.string,
  onChange: PropTypes.func,
  show: PropTypes.bool,
};

POValue.displayName = 'POValue';

export default memo(POValue);
