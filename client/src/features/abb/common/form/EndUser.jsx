import React, { memo, useCallback } from 'react';
import { connect } from 'react-redux';

import { showUserSearchModal } from 'actions/CustomerActions';
import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import Tooltip from 'empower-components/Tooltip';
import PropTypes from 'prop-types';

const EndUser = ({ onChange, showUserSearchModal, ...rest }) => {
  const handleSearch = useCallback(() => {
    showUserSearchModal(true, null, false, 'ec');
  }, [showUserSearchModal]);

  return (
    <InputForm
      search
      extra={
        <Tooltip title={msgFormatter('endUserToolTip')()}>
          <i className="fal fa-question-circle" />
        </Tooltip>
      }
      handleChange={onChange}
      handleSearch={handleSearch}
      id="end_user"
      label={msgFormatter('endUser')()}
      placeholder={msgFormatter('optional')()}
      searchIcon="fal fa-search"
      {...rest}
    />
  );
};

EndUser.propTypes = {
  onChange: PropTypes.func,
  showUserSearchModal: PropTypes.func.isRequired,
};

EndUser.displayName = 'EndUser';

export default connect(null, { showUserSearchModal })(memo(EndUser));
