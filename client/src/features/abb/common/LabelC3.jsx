import React from 'react';

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
