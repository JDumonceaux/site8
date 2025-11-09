import React from "react";

import { msgFormatter } from "app/util";
import GridNameDate from "../tables/GridNameDate";
import FieldMargin from "./FieldMargin";
import Label from "./Label";

const CreatedBy = ({ margin, quote, ...rest }) => {
    return (
      <FieldMargin margin={margin}>
        <Label label={msgFormatter("createdBy")()} {...rest} />
        <GridNameDate type="createdInfo">{quote}</GridNameDate>
      </FieldMargin>
    );
};

export default CreatedBy;
