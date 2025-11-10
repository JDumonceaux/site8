import React from 'react';
import { connect } from 'react-redux';

import { showEditNoteModal } from 'actions/InteractionActions';
import { msgFormatter } from 'app/util';
import { actionType } from 'components/modals/EditNoteModal';
import Button from 'empower-components/Button';
import { QUOTE_STATUS_ID } from 'wwwroot/feature/common/Constants';
import Header from 'wwwroot/feature/common/viewHeader/ViewHeader';

const ViewHeader = ({ quote, showEditNoteModal }) => {
  const handleShowModal = () => {
    showEditNoteModal(true, null, actionType.add, 'notes', '', '');
  };

  const { ReadOnly, StatusID, UserAuth } = quote;
  const isShowButton =
    !UserAuth &&
    (!ReadOnly || (ReadOnly && StatusID === QUOTE_STATUS_ID.Pending));

  return (
    <Header>
      {isShowButton ? (
        <Button
          handleClick={handleShowModal}
          size="regular"
          title={msgFormatter('addNote')()}
          buttonType="primary"
        />
      ) : null}
    </Header>
  );
};

const mapStateToProps = (state) => ({
  quote: state.Quote.currentQuote,
});

export default connect(mapStateToProps, {
  showEditNoteModal,
})(ViewHeader);
