import React from "react";

import { default as Header } from "wwwroot/feature/common/viewHeader/ViewHeader";
import { showEditNoteModal } from "actions/InteractionActions";
import Button from "empower-components/Button";
import { connect } from "react-redux";
import { msgFormatter } from "app/util";
import { actionType } from "components/modals/EditNoteModal";
import { QUOTE_STATUS_ID } from "wwwroot/feature/common/Constants";

const ViewHeader = ({ quote, showEditNoteModal }) => {
    const handleShowModal = () => {
        showEditNoteModal(true, null, actionType.add, "notes", "", "");
    };

    const { UserAuth, ReadOnly, StatusID } = quote;
    let isShowButton = !UserAuth && (!ReadOnly || (ReadOnly && StatusID === QUOTE_STATUS_ID.Pending));

    return (
        <Header>
            {isShowButton ? (
                <Button
                    buttonType="primary"
                    size="regular"
                    title={msgFormatter("addNote")()}
                    handleClick={handleShowModal}
                />
            ) : null}
        </Header>
    );
};

const mapStateToProps = state => ({
    quote: state.Quote.currentQuote
});

export default connect(mapStateToProps, {
    showEditNoteModal
})(ViewHeader);
