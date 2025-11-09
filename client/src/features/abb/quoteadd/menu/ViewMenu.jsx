import React from "react";

import SaveButtons from "./SaveButtons";

const ViewMenu = ({ data, history, disableSave }) => {
    return (
        <SaveButtons
            quote={data?.quote}
            quoteSaveAction={data?.quoteSaveAction}
            history={history}
            disabled={disableSave}
        />
    );
};

export default ViewMenu;
