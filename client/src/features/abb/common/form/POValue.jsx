import React from "react";

import { msgFormatter } from "app/util";
import FieldMargin from "./FieldMargin";
import NumberForm from "./NumberForm";

const POValue = ({ margin, onChange, show, value, ...rest }) => {
    if (!show) return null;

    return (
      <FieldMargin margin={margin}>
        <NumberForm
          handleChange={onChange}
          id="po_value"
          label={msgFormatter("poValue")()}
          mDec={2}
          vMin={0}
          {...rest}
        />
      </FieldMargin>
    );
};

export default POValue;
