import React from 'react';

import PropTypes from 'prop-types';
import Label from './Label';

// Reusable label wrapper
export const LabelC3 = ({
  children,
  isDisplayed = true,
  keepSpacing = false,
  path,
  startAdornment,
}) =>
  isDisplayed ? (
    <Label
      className="col-xs-6 col-sm-3"
      path={path}
      startAdornment={startAdornment}
    >
      {children}
    </Label>
  ) : keepSpacing ? (
    <div className="col-xs-6 col-sm-3" />
  ) : null;

LabelC3.propTypes = {
  children: PropTypes.node,
  isDisplayed: PropTypes.bool,
  keepSpacing: PropTypes.bool,
  path: PropTypes.string,
  startAdornment: PropTypes.node,
};
