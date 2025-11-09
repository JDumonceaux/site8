import React from "react";

import { msgFormatter } from "app/util";
import FieldMargin from "./FieldMargin";
import Label from "./Label";

const IncotermLabel = ({ margin, value }) => {
    return (
      <FieldMargin margin={margin}>
        <Label label={msgFormatter("incoTermsLabel")()}>{value}</Label>
      </FieldMargin>
    );
};

export default IncotermLabel;
