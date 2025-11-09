import React from "react";

import { CreatedBy, LastChangedBy, Status } from "../common/form";

const StatusSection = ({ quote, statusId }) => {
    return (
        <>
            <div className="col-xs-6 col-sm-4">
                <CreatedBy margin={true} quote={quote} />
            </div>
            <div className="col-xs-6 col-sm-4">
                <LastChangedBy margin={true} quote={quote} />
            </div>
            <div className="col-xs-6 col-sm-4">
                <Status statusId={statusId} />
            </div>
        </>
    );
};

export default StatusSection;
