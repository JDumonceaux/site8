import React from 'react';
import { FormatDate, FormatMessage } from 'react-globalize';

import PropTypes from 'prop-types';

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

DateView.propTypes = {
  altMessage: PropTypes.string,
  dateValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  path: PropTypes.string,
};

export default DateView;
