import React from 'react';
import { FormatNumber } from 'react-globalize';

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

export default GridNumber;
