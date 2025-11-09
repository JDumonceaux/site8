import React from "react";

import { msgFormatter } from "app/util";
import Tooltip from "empower-components/Tooltip";
import FieldMargin from "./FieldMargin";
import Label from "./Label";

const EndUserLabel = ({ margin, value }) => {
    return (
      <FieldMargin margin={margin}>
        <Label
          label={msgFormatter("accountManagerEndUser")()}
          endAdornment={(
            <Tooltip title={msgFormatter("amEndUserToolTip")()}>
              <i className="fal fa-question-circle" />
            </Tooltip>
                  )}
        >
          {value}
        </Label>
      </FieldMargin>
    );
};

export default EndUserLabel;
