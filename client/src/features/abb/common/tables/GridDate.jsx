import React from 'react';
import { FormatDate } from 'react-globalize';

import PropTypes from 'prop-types';

const GridDate = ({ children }) => {
  return <FormatDate>{new Date(children)}</FormatDate>;
};

GridDate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

export default GridDate;
