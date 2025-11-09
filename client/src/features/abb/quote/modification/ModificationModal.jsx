import React, { useState, useEffect } from "react";
import Modal from "empower-components/Modal";
import InputForm from "empower-components/InputForm";
import { msgFormatter } from "app/util";
import Accordion from "./Accordion";
import { connect } from "react-redux";
import {
    getModList,
    resetModList,
    toggleModHeader,
    toggleModValue,
    serialMods,
    showModificationModal,
    postOrderSerialMods,
    getModListPostOrder,
    updateBlankMod
} from "actions/GlobalModActions";
import styled from "styled-components";

const ModificationModal = ({
    modlist,
    postOrder,
    orderShow,
    show,
    postOrderSerialMods,
    serialMods,
    handleModClick,
    showModificationModal,
    resetModList,
    toggleModHeader,
    toggleModValue,
    updateBlankMod,
    updatedBlankMods
}) => {
    const [searchText, setSearchText] = useState("");

    // Note: This handles only a single item at a time vs. all the entries on the modal.
    const handleSubmit = () => {
        // index = the item being edited (ex. "6 Point Additional Terminal Board")
        const index = modlist.findIndex(item => item.toggle);
        // valIndex = the selected radio value for the item being edited (ex. 0 = true)
        const valIndex = modlist[index].Values.findIndex(item => item.toggle);
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

    const handleSearchChange = searchText => {
        setSearchText(searchText);
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

    const filteredModlist = modlist?.filter(x =>
        x.Category.toLowerCase().includes(lcSearchText)
    );

    return (
        <Modal
            show={postOrder ? orderShow : show}
            size="md"
            id="modification-modal"
            onHide={handleClose}
            title={msgFormatter("modifications")()}
            primaryButton={{
                title: msgFormatter("apply")(),
                handleClick: handleSubmit
            }}
            secondaryButton={{
                title: msgFormatter("close")(),
                handleClick: handleClose
            }}
        >
            <InputForm
                id="modification-search"
                search={true}
                placeHolder={msgFormatter("modificationSearch")()}
                inputText={searchText}
                handleChange={val => handleSearchChange(val)}
                searchIcon="fal fa-search"
            />
            <InstDiv>{msgFormatter("modificationMsg")()}</InstDiv>
            <Inst2Div>{msgFormatter("submodificationMsg")()}</Inst2Div>
            <Accordion
                headerToggle={headerToggle}
                valueToggle={valueToggle}
                updateBlankValue={updateBlankValue}
                mods={filteredModlist}
                updatedBlankMods={updatedBlankMods}
            />
        </Modal>
    );
};

const ModificationModalContainer = ({
    postOrder,
    orderShow,
    show,
    items,
    currentQuote,
    getModListPostOrder,
    getModList,
    ...props
}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (postOrder && orderShow) {
            const quoteItems = postOrder
                ? items
                : currentQuote.QuoteItems.filter(item => item.uiGlobalMods);
            setLoaded(true);
            getModListPostOrder(quoteItems);
        }
    }, [postOrder, orderShow, items, currentQuote, getModListPostOrder]);

    useEffect(() => {
        if (show && !loaded) {
            const quoteItems = postOrder
                ? items
                : currentQuote.QuoteItems.filter(item => item.uiGlobalMods);
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
        getModList
    ]);

    return show || (postOrder && orderShow) ? (
        <ModificationModal
            {...props}
            show={show}
            orderShow={orderShow}
            postOrder={postOrder}
        />
    ) : null;
};

const mapStateToProps = state => ({
    modlist: state.GlobalMod.modlist,
    show: state.GlobalMod.show,
    currentQuote: state.Quote.currentQuote,
    updatedBlankMods: state.GlobalMod.updatedBlankMods
});

export default connect(mapStateToProps, {
    getModList,
    resetModList,
    toggleModHeader,
    toggleModValue,
    serialMods,
    showModificationModal,
    postOrderSerialMods,
    getModListPostOrder,
    updateBlankMod
})(ModificationModalContainer);

const InstDiv = styled.div`
    margin-top: 8px;
    margin-bottom: 16px;
`;
const Inst2Div = styled.div`
    margin-bottom: 16px;
`;
