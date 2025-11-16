import React, { memo, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showCustomerSearchModal } from 'actions/CustomerActions';
import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import Tooltip from 'empower-components/Tooltip';

// SoldTo: Input for Sold-To account with search and tooltip
const SoldTo = ({ onChange, showCustomerSearchModal, user, ...rest }) => {
  // TO DO - Add Alternative Search Logic
  const handleSearch = useCallback(() => {
    showCustomerSearchModal(true, user);
  }, [showCustomerSearchModal, user]);

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

SoldTo.propTypes = {
  onChange: PropTypes.func,
  showCustomerSearchModal: PropTypes.func,
  user: PropTypes.object,
};

SoldTo.displayName = 'SoldTo';

const mapStateToProps = (state) => ({ user: state.App.currentUser });

export default connect(mapStateToProps, { showCustomerSearchModal })(
  memo(SoldTo),
);
