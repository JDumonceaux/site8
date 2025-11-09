import React from "react";

import { msgFormatter } from "app/util";
import styled from "styled-components";
import { handleColorType } from "wwwroot/feature/common/StyleColorType";
import FieldMargin from "./FieldMargin";
import Label from "./Label";

const Status = ({ margin, statusId, ...rest }) => {
    let statusState = "";
    switch (statusId) {
        case 2: { // Pending
            statusState = "error";
            break;
        }
        case 3: { // Submitted
            statusState = "warning";
            break;
        }
        case 4: // Won
        case 6: { // Won
            statusState = "info";
            break;
        }
        case 5: { // Closed
            statusState = "disabled";
            break;
        }
        default: {
            statusState = "success";
            break;
        }
    }

    return (
      <FieldMargin margin={margin}>
        <Label label={msgFormatter("status")()} {...rest} />
        <StatusDiv>
          {msgFormatter(`server/status/short/${  statusId}`)()}
        </StatusDiv>
      </FieldMargin>
    );
};

export default Status;

const StatusDiv = styled.div`
    color: ${props => handleColorType(props.$status)};
`;
