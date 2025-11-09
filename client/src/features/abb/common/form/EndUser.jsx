import React from "react";
import { connect } from "react-redux";

import { showUserSearchModal } from "actions/CustomerActions";
import { msgFormatter } from "app/util";
import InputForm from "empower-components/InputForm";
import Tooltip from "empower-components/Tooltip";

const EndUser = ({ onChange, showUserSearchModal, ...rest }) => {
    const handleSearch = () => {
        showUserSearchModal(true, null, false, "ec");
    };

    return (
      <InputForm
        search
        extra={(
          <Tooltip title={msgFormatter("endUserToolTip")()}>
            <i className="fal fa-question-circle" />
          </Tooltip>
              )}
        handleChange={onChange}
        handleSearch={handleSearch}
        id="end_user"
        label={msgFormatter("endUser")()}
        placeholder={msgFormatter("optional")()}
        searchIcon="fal fa-search"
        {...rest}
      />
    );
};

export default connect(null, { showUserSearchModal })(EndUser);
