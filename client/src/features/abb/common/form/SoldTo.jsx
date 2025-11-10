import React from 'react';
import { connect } from 'react-redux';

import {
  showCustomerSearchModal,
  showUserSearchModal,
} from 'actions/CustomerActions';
import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import Tooltip from 'empower-components/Tooltip';

const SoldTo = ({ onChange, showCustomerSearchModal, user, ...rest }) => {
  // TO DO - Add Alternative Search Logic
  const handleSearch = () => {
    showCustomerSearchModal(true, user);
  };

  return (
    <InputForm
      search
      extra={
        <Tooltip title={msgFormatter('accountToolTip')()}>
          <i className="fal fa-question-circle" />
        </Tooltip>
      }
      handleChange={onChange}
      handleSearch={handleSearch}
      id="sold_to"
      label={msgFormatter('soldToAccount')()}
      placeholder=""
      searchIcon="fal fa-search"
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({ user: state.App.currentUser });

export default connect(mapStateToProps, { showCustomerSearchModal })(SoldTo);
