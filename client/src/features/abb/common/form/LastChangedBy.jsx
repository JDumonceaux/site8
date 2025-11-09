import React from "react";

import { msgFormatter } from "app/util";
import GridNameDate from "../tables/GridNameDate";
import FieldMargin from "./FieldMargin";
import Label from "./Label";

const LastChangedBy = ({ margin, quote, ...rest }) => {
    return (
      <FieldMargin margin={margin}>
        <Label label={msgFormatter("createdBy")()} {...rest} />
        <GridNameDate type="modifiedInfo">{quote}</GridNameDate>
      </FieldMargin>
    );
};

export default LastChangedBy;
