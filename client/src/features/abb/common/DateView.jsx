import React from 'react';
import { FormatDate, FormatMessage } from 'react-globalize';

const DateView = ({ altMessage = null, dateValue = null, path }) => {
  if (
    (dateValue === null || Number.isNaN(Date.parse(dateValue))) &&
    altMessage
  ) {
    return <FormatMessage path={path}>{altMessage}</FormatMessage>;
  }
  if (dateValue && !Number.isNaN(Date.parse(dateValue))) {
    return <FormatDate>{new Date(dateValue)}</FormatDate>;
  }
  return null;
};

export default DateView;
