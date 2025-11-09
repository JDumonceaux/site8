import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import { showDeleteModal, showEditNoteModal } from 'actions/InteractionActions';
import { deleteType } from 'components/modals/DeleteModal';
import { actionType } from 'components/modals/EditNoteModal';
import { QUOTE_STATUS_ID } from 'wwwroot/feature/common/Constants';
import Menu from 'wwwroot/feature/common/menus/actionsMenu/ActionsMenu';
import { MenuItemType } from 'wwwroot/feature/common/menus/iconsMenu/IconsMenu';

const ActionsMenu = ({ item, quote, showDeleteModal, showEditNoteModal }) => {
  const { ReadOnly, StatusID, UserAuth } = quote;
  const isReadOnly =
    UserAuth || (ReadOnly && StatusID !== QUOTE_STATUS_ID.Pending); // = 2

  const handleEdit = useCallback(() => {
    showEditNoteModal(true, item, actionType.edit, 'notes');
  }, [item, showEditNoteModal]);

  const handleDelete = useCallback(() => {
    showDeleteModal(true, item, deleteType.note);
  }, [item, showDeleteModal]);

  const menuItems = useMemo(
    () => [
      {
        isEnabled: !isReadOnly,
        onClick: handleEdit,
        type: MenuItemType.Edit,
      },
      {
        isEnabled: !isReadOnly,
        onClick: handleDelete,
        type: MenuItemType.Delete,
      },
    ],
    [handleEdit, handleDelete, isReadOnly],
  );

  return <Menu items={menuItems} />;
};

const mapStateToProps = (state) => ({
  quote: state.Quote.currentQuote,
});

export default connect(mapStateToProps, {
  showDeleteModal,
  showEditNoteModal,
})(ActionsMenu);
