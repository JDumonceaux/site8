import React from 'react';
import { FormatNumber } from 'react-globalize';

import PropTypes from 'prop-types';

const GridNumber = ({ max = 4, min = 2, val }) => {
  return (
    <FormatNumber
      options={{
        maximumFractionDigits: max,
        minimumFractionDigits: min,
      }}
    >
      {val}
    </FormatNumber>
  );
};

GridNumber.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  val: PropTypes.number,
};

export default GridNumber;
