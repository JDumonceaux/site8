import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  getModList,
  getModListPostOrder,
  postOrderSerialMods,
  resetModList,
  serialMods,
  showModificationModal,
  toggleModHeader,
  toggleModValue,
  updateBlankMod,
} from 'actions/GlobalModActions';
import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import Modal from 'empower-components/Modal';
import styled from 'styled-components';
import Accordion from './Accordion';

const ModificationModal = ({
  handleModClick,
  modlist,
  orderShow,
  postOrder,
  postOrderSerialMods,
  resetModList,
  serialMods,
  show,
  showModificationModal,
  toggleModHeader,
  toggleModValue,
  updateBlankMod,
  updatedBlankMods,
}) => {
  const [searchText, setSearchText] = useState('');

  // Note: This handles only a single item at a time vs. all the entries on the modal.
  const handleSubmit = () => {
    // index = the item being edited (ex. "6 Point Additional Terminal Board")
    const index = modlist.findIndex((item) => item.toggle);
    // valIndex = the selected radio value for the item being edited (ex. 0 = true)
    const valIndex = modlist[index].Values.findIndex((item) => item.toggle);
    // If the order has already been placed?
    if (postOrder) {
      postOrderSerialMods(index, valIndex);
    } else {
      serialMods(index, valIndex);
    }
  };

  const handleClose = () => {
    if (postOrder) {
      handleModClick();
    } else {
      showModificationModal(false, null);
    }
    resetModList();
  };

  const handleSearchChange = (val) => {
    setSearchText(val);
  };

  const headerToggle = (category, toggle) => {
    toggleModHeader(category, toggle);
  };

  const valueToggle = (category, valIndex) => {
    toggleModValue(category, valIndex);
  };

  const updateBlankValue = (category, index, valIndex, textInput) => {
    updateBlankMod(category, index, valIndex, textInput);
  };

  const lcSearchText = searchText.toLowerCase().trim();

  const filteredModlist = modlist?.filter((x) =>
    x.Category.toLowerCase().includes(lcSearchText),
  );

  return (
    <Modal
      id="modification-modal"
      size="md"
      title={msgFormatter('modifications')()}
      onHide={handleClose}
      primaryButton={{
        handleClick: handleSubmit,
        title: msgFormatter('apply')(),
      }}
      secondaryButton={{
        handleClick: handleClose,
        title: msgFormatter('close')(),
      }}
      show={postOrder ? orderShow : show}
    >
      <InputForm
        search
        handleChange={(val) => handleSearchChange(val)}
        id="modification-search"
        inputText={searchText}
        placeHolder={msgFormatter('modificationSearch')()}
        searchIcon="fal fa-search"
      />
      <InstDiv>{msgFormatter('modificationMsg')()}</InstDiv>
      <Inst2Div>{msgFormatter('submodificationMsg')()}</Inst2Div>
      <Accordion
        updateBlankValue={updateBlankValue}
        headerToggle={headerToggle}
        mods={filteredModlist}
        updatedBlankMods={updatedBlankMods}
        valueToggle={valueToggle}
      />
    </Modal>
  );
};

const ModificationModalContainer = ({
  currentQuote,
  getModList,
  getModListPostOrder,
  items,
  orderShow,
  postOrder,
  show,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (postOrder && orderShow) {
      const quoteItems = postOrder
        ? items
        : currentQuote.QuoteItems.filter((item) => item.uiGlobalMods);
      setLoaded(true);
      getModListPostOrder(quoteItems);
    }
  }, [postOrder, orderShow, items, currentQuote, getModListPostOrder]);

  useEffect(() => {
    if (show && !loaded) {
      const quoteItems = postOrder
        ? items
        : currentQuote.QuoteItems.filter((item) => item.uiGlobalMods);
      setLoaded(true);
      if (postOrder) {
        getModListPostOrder(quoteItems);
      } else {
        getModList(quoteItems);
      }
    }
    if (postOrder && !orderShow && loaded) {
      setLoaded(false);
    } else if (!show && loaded) {
      setLoaded(false);
    }
  }, [
    show,
    loaded,
    postOrder,
    orderShow,
    items,
    currentQuote,
    getModListPostOrder,
    getModList,
  ]);

  return show || (postOrder && orderShow) ? (
    <ModificationModal
      {...props}
      orderShow={orderShow}
      postOrder={postOrder}
      show={show}
    />
  ) : null;
};

const mapStateToProps = (state) => ({
  currentQuote: state.Quote.currentQuote,
  modlist: state.GlobalMod.modlist,
  show: state.GlobalMod.show,
  updatedBlankMods: state.GlobalMod.updatedBlankMods,
});

export default connect(mapStateToProps, {
  getModList,
  getModListPostOrder,
  postOrderSerialMods,
  resetModList,
  serialMods,
  showModificationModal,
  toggleModHeader,
  toggleModValue,
  updateBlankMod,
})(ModificationModalContainer);

const InstDiv = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
`;
const Inst2Div = styled.div`
  margin-bottom: 16px;
`;
