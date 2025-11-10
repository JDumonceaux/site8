import React from 'react';

import { msgFormatter } from 'app/util';
import FieldMargin from './FieldMargin';
import Label from './Label';

const OpportunityLabel = ({ margin, show, value }) => {
  if (!show) return null;

  return (
    <FieldMargin margin={margin}>
      <Label label={msgFormatter('opportunity')()}>{value}</Label>
    </FieldMargin>
  );
};

export default OpportunityLabel;
