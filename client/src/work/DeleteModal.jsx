import Modal from 'empower-components/Modal';
import React, { useEffect, useState } from 'react';
import { FormatMessage } from 'react-globalize';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Cookies from 'app/Cookies';
import { msgFormatter } from 'app/util';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';

const deleteType = {
  quote: 'quote',
  quoteItem: 'quoteItem',
  quoteItems: 'quoteItems',
  order: 'order',
  proposal: 'proposal',
  note: 'note',
  contact: 'contact',
  reengineer: 'reengineer',
  resequence: 'resequence',
  quoteVersion: 'quoteVersion',
  noteTemplate: 'noteTemplate',
  purgeLineItem: 'purgeLineItem',
  attachments: 'attachments',
  editClearCustomer: 'editClearCustomer',
  restoreQuote: 'restoreQuote',
  panelSchedule: 'panelSchedule',
  retransmitOrder: 'retransmitOrder',
  panelFile: 'panelFile',
  userAddress: 'userAddress',
};

const DeleteModal = ({
    data: { show, deleteObject, deleteType: deleteCategory, currentQuote },
    showDeleteModal,
    deleteQuote,
    deleteQuoteItem,
    deleteSelectQuoteItems,
    deleteOrder,
    deleteProposal,
    deleteNote,
    deleteProposalContact,
    deleteQuoteVersion,
    deleteNoteTemplate,
    purgeQuoteItemInRecycleBin,
    deleteQuoteAttachment,
    deletePanelSchedule,
    retransmitOrder,
    deleteFile,
    deleteAddress,
    reEngineer,
    getQuote,
    setCurrentOrderCustomer,
    updateOrderHeader,
    updateQuoteContractorCustomer,
    validateCatalogQuoteItems,
}) => {
    const [title, setTitle] = useState('');
    const [msg, setMsg] = useState('');
    const [buttonTitle, setButtonTitle] = useState('');
    const [form, setForm] = useState(null);
    const [comments, setComments] = useState('');
    const [resequence, setResequence] = useState(false);

    useEffect(() => {
        if (show) {
            modalValues(deleteObject);
            setComments('');
        }
    }, [show, deleteObject]);

    const handleCloseClick = () => {
        if (deleteObject?.QuoteItems) {
            deleteObject.QuoteItems.forEach((item) => {
                if (item.ConfigurationStatus === 8) {
                    item.uiSelected = false;
                }
            });
        }
        showDeleteModal(false, deleteObject, deleteCategory);
    };

    const handleDelete = () => {
        if (deleteObject) {
            switch (deleteCategory) {
                case deleteType.quote:
                    deleteQuote(deleteObject['QuoteID'], true);
                    break;
                case deleteType.quoteItem:
                    deleteQuoteItem(deleteObject, resequence);
                    break;
                case deleteType.quoteItems:
                    deleteSelectQuoteItems(deleteObject, resequence);
                    break;
                case deleteType.order:
                    deleteOrder(deleteObject['callback'], comments);
                    break;
                case deleteType.proposal:
                    deleteProposal(deleteObject['ProposalID']);
                    break;
                case deleteType.note:
                    deleteNote(deleteObject);
                    break;
                case deleteType.contact:
                    deleteProposalContact(deleteObject.ContactID);
                    break;
                case deleteType.reengineer:
                    processReengineer(deleteObject);
                    break;
                case deleteType.resequence:
                    getQuote(deleteObject['QuoteID'], true);
                    break;
                case deleteType.quoteVersion:
                    deleteQuoteVersion(deleteObject.QuoteID, deleteObject.VersionID);
                    break;
                case deleteType.noteTemplate:
                    deleteNoteTemplate(deleteObject.TemplateID);
                    break;
                case deleteType.purgeLineItem:
                    purgeQuoteItemInRecycleBin(deleteObject.QuoteID, deleteObject.ItemID);
                    break;
                case deleteType.attachments:
                    deleteQuoteAttachment(
                        deleteObject.quoteID,
                        deleteObject.attachment.DocumentID,
                        deleteObject.selectedDocs,
                        deleteObject.actionType,
                    );
                    break;
                case deleteType.panelSchedule:
                    deletePanelSchedule(deleteObject, comments);
                    break;
                case deleteType.retransmitOrder:
                    retransmitOrder();
                    break;
                case deleteType.panelFile:
                    deleteFile(deleteObject.file);
                    break;
                case deleteType.userAddress:
                    deleteAddress(deleteObject, deleteObject['callback']);
                    break;
                default:
                    break;
            }
        }
        showDeleteModal(false, deleteObject, deleteCategory);
    };

    const handleCommentsChange = (e) => setComments(e.target.value);
    const handleResequence = () => setResequence(!resequence);

    const modalValues = (modalObj) => {
        let obj = { title: '', msg: '', buttonTitle: '', form: false };
        switch (this.props.data.deleteType) {
            case deleteType.quote:
                obj.title = msgFormatter('archiveQuote')(); //"Archive Quote";
                obj.msg = msgFormatter('archiveQuotePrompt')(modalObj['QuoteName']); //"Are you sure you want to archive quote: {0}?";
                obj.buttonTitle = msgFormatter('archive')(); //"Archive";
                break;
            case deleteType.quoteItem:
                obj.title = msgFormatter('deleteQuoteItem')(); //"Delete Quote Item";
                obj.buttonTitle = msgFormatter('delete')();
                obj.msg = msgFormatter('deleteQuoteItemPrompt')(
                    modalObj['ProductDescription'],
                ); //"Are you sure you want to delete quote item: {0}?";
                obj.form = true; //(<div className="checkbox pull-right" style={{marginTop: "8px"}}><label><input type="checkbox" ref="resequence" /><FormatMessage path="resequenceLabel">Resequence?</FormatMessage></label></div>);
                break;
            case deleteType.quoteItems:
                var orderedLineItems = modalObj['QuoteItems']
                    .filter((item) => {
                        if (item.uiSelected && item.BomItemOrdered) {
                            item.uiSelected = false;
                            return true;
                        }
                        return false;
                    })
                    .map((item) => item.Sequence);
                var lineItemsCannotBeDeletedMsg;
                if (orderedLineItems.length > 0) {
                    lineItemsCannotBeDeletedMsg = (
                        <p>
                            <FormatMessage
                                path="orderedLineItemsExistMsg"
                                variables={orderedLineItems.join(', ')}>
                                {
                                    'Warning: line item(s) {0} cannot be deleted because they have already been ordered. '
                                }
                            </FormatMessage>
                        </p>
                    );
                }

                var lineItems = modalObj['QuoteItems']
                    .filter((item) => item.uiSelected)
                    .map((item) => item.Sequence);
                var deleteLineItemsMsg;
                if (lineItems.length === 0) {
                    deleteLineItemsMsg = (
                        <span>
                            <p>
                                <FormatMessage path="noItemsSelectedForDeletionMsg">
                                    {
                                        'No items have been selected.  Please select at least one item to delete.'
                                    }
                                </FormatMessage>
                            </p>
                            {lineItemsCannotBeDeletedMsg}
                        </span>
                    );
                } else {
                    deleteLineItemsMsg = (
                        <span>
                            <p>
                                <FormatMessage
                                    path="deleteQuoteItemsMsg"
                                    variables={lineItems.join(', ')}>
                                    {'Delete quote item(s) {0}?'}
                                </FormatMessage>
                            </p>
                            {lineItemsCannotBeDeletedMsg}
                        </span>
                    );
                }

                obj.title = (
                    <FormatMessage path="deleteQuoteItems">
                        Delete Quote Items
                    </FormatMessage>
                );
                obj.msg = deleteLineItemsMsg;
                obj.form = true;
                obj.buttonTitle = msgFormatter('delete')();
                break;
            case deleteType.order:
                obj.title = msgFormatter('deleteOrder')(); //"Delete Order";
                obj.buttonTitle = msgFormatter('delete')();
                obj.msg = msgFormatter('deleteOrderPrompt')(modalObj['OrderName']); //"Are you sure you want to delete order: {0}?";
                //name = obj["OrderName"];
                break;
            case deleteType.proposal:
                obj.title = (
                    <FormatMessage path="deleteDocument">Delete Document</FormatMessage>
                );
                obj.msg = (
                    <FormatMessage path="deleteDocumentMsg">
                        Are you sure you want to delete your document?
                    </FormatMessage>
                );
                obj.name = modalObj['ProposalID'];
                obj.buttonTitle = msgFormatter('delete')();
                break;
            case deleteType.note:
                if (this.props.data.deleteObject.msgForDeleteModal !== 'Quote') {
                    obj.msg = (
                        <FormatMessage path="deleteNoteMsg">
                            Are you sure you want to delete this note?
                        </FormatMessage>
                    );
                } else {
                    obj.msg = (
                        <FormatMessage path="deleteQuoteLevelNoteMsg">
                            Quote-level notes are shared across all versions. Are you sure you
                            want to delete this note?
                        </FormatMessage>
                    );
                }
                obj.title = (
                    <FormatMessage path="deleteNote">Delete Note</FormatMessage>
                );
                obj.buttonTitle = msgFormatter('delete')();
                break;
            case deleteType.contact:
                obj.title = (
                    <FormatMessage path="deleteContact">Delete Contact</FormatMessage>
                );
                obj.buttonTitle = msgFormatter('delete')();
                obj.msg = (
                    <span>
                        <FormatMessage
                            path="deleteContactMsg"
                            variables={[modalObj.FirstName, modalObj.LastName]}>
                            {'Are you sure you want to delete this contact, {0} {1}?'}
                        </FormatMessage>
                    </span>
                );
                break;
            case deleteType.reengineer:
                var lineItems = modalObj['QuoteItems']
                    .filter(
                        (item) =>
                            item.uiReengineer ||
                            (item.uiSelected &&
                                item.ProductCode !== '0001' &&
                                item.ConfigurationType === 0),
                    )
                    .map((item) => item.Sequence);
                lineItems =
                    msgFormatter('reEngineerMsg')() + ' ' + lineItems.join(', ') + '?';
                obj.title = (
                    <FormatMessage path="reEngineer">Re-Engineer</FormatMessage>
                );
                obj.msg = lineItems;
                obj.buttonTitle = msgFormatter('apply')(); //"Apply";
                break;
            case deleteType.editClearCustomer:
                let customValues = {
                    DisplayID: '',
                    Name: '',
                    Action: '',
                    localKey: '',
                };
                if (modalObj.func) {
                    customValues.DisplayID = modalObj.ContractorCustomerSapID;
                    customValues.Name = modalObj.ContractorCustomerName;
                    customValues.Action = msgFormatter('Remove')().toLowerCase();
                    customValues.localKey = 'editClearMsg';
                } else {
                    customValues.DisplayID = modalObj.selectedCustomer.DisplayID;
                    customValues.Name = modalObj.selectedCustomer.Name;
                    customValues.Action = msgFormatter('update')().toLowerCase();
                    customValues.localKey = 'editAddMsg';
                }
                obj.title = <FormatMessage path="confirm">Confirm</FormatMessage>;
                obj.msg = (
                    <FormatMessage
                        path={customValues.localKey}
                        variables={[
                            customValues.DisplayID,
                            customValues.Name,
                            customValues.Action,
                        ]}>
                        {'Are you sure you want to {2} End Customer value to {0} - {1}?'}
                    </FormatMessage>
                );
                obj.buttonTitle = msgFormatter('apply')(); //"Apply";
                break;
            case deleteType.resequence:
                obj.title = <FormatMessage path="resequence">Resequence</FormatMessage>;
                obj.msg = (
                    <FormatMessage path="reSequenceMsg">
                        Are you sure you want to Resequence?
                    </FormatMessage>
                );
                obj.buttonTitle = msgFormatter('apply')(); //"Apply";
                break;
            case deleteType.quoteVersion:
                obj.title = (
                    <FormatMessage path="deleteVersion">Delete Version</FormatMessage>
                );
                obj.msg = (
                    <FormatMessage
                        path="deleteVersionMsg"
                        variables={[modalObj.VersionName]}>
                        {'Are you sure you want to delete this version, {0}?'}
                    </FormatMessage>
                );
                obj.buttonTitle = msgFormatter('apply')(); //"Apply";
                break;
            case deleteType.noteTemplate:
                obj.title = (
                    <FormatMessage path="deleteNoteTemplate">
                        Delete Note Template
                    </FormatMessage>
                );
                obj.msg = (
                    <FormatMessage path="deleteNoteTemplateMsg">
                        Are you sure you want to delete this note template?
                    </FormatMessage>
                );
                obj.buttonTitle = msgFormatter('delete')();
                break;
            case deleteType.purgeLineItem:
                obj.title = msgFormatter('purgeRecycleBin')();
                obj.msg = msgFormatter('purgeQuoteItemMsg')();
                obj.buttonTitle = msgFormatter('delete')();
                break;
            case deleteType.attachments:
                obj.title = msgFormatter('deleteAttachments')();
                obj.msg = msgFormatter('deleteAttachmentsMsg')(
                    modalObj.attachment['Data'],
                );
                obj.buttonTitle = msgFormatter('delete')();
                break;
            case deleteType.restoreQuote:
                obj.title = msgFormatter('restoreQuote')(); //"Restore Quote";
                obj.msg = msgFormatter('restoreQuotePrompt')(modalObj['QuoteName']);
                obj.buttonTitle = msgFormatter('restore')(); //"Restore";
                break;
            case deleteType.panelFile:
                obj.title = (
                    <FormatMessage path="deletePanelFile">
                        Delete Panel File
                    </FormatMessage>
                );
                obj.msg = (
                    <FormatMessage path="deletePanelFileMsg">
                        Are you sure you want to delete Panel File?
                    </FormatMessage>
                );
                obj.buttonTitle = <FormatMessage path="yes">Yes</FormatMessage>;
                break;
            case deleteType.panelSchedule:
                obj.title = (
                    <FormatMessage path="deletePanelSchedule">
                        Delete Panel Schedule
                    </FormatMessage>
                );
                var lastPanelMessage = null;
                if (modalObj.schedule.PanelCount === 1) {
                    lastPanelMessage = (
                        <p>
                            <FormatMessage
                                path="lastPanelScheduleMsg"
                                variables={[modalObj.schedule.FileName]}>
                                {
                                    'Caution: This panel is the only one left on this schedule.  Deleting this panel will delete the schedule document "{0}" as well.'
                                }
                            </FormatMessage>
                        </p>
                    );
                }
                obj.msg = (
                    <span>
                        <p>
                            <FormatMessage
                                path="deletePanelScheduleMsg"
                                variables={[
                                    modalObj.panel.PanelName,
                                    modalObj.panel.PageNumber,
                                    modalObj.schedule.FileName,
                                ]}>
                                {
                                    'Are you sure you want to delete panel "{0}" on page {1} of schedule "{2}"?'
                                }
                            </FormatMessage>
                        </p>
                        {lastPanelMessage}
                    </span>
                );
                obj.buttonTitle = <FormatMessage path="yes">Yes</FormatMessage>;
                break;
            case deleteType.retransmitOrder:
                obj.title = (
                    <FormatMessage path="retransmitOrder">Retransmit Order</FormatMessage>
                );
                obj.msg = (
                    <FormatMessage
                        path="retransmitOrderPrompt"
                        variables={[modalObj.orderName]}>
                        {'Are you sure you want to retransmit this order, {0}?'}
                    </FormatMessage>
                );
                obj.buttonTitle = msgFormatter('retransmit')(); //"Retransmit";
                break;
            case deleteType.userAddress:
                obj.title = <FormatMessage path="address">Address</FormatMessage>;
                obj.msg = (
                    <FormatMessage path="deleteAddressMsg">
                        {'Are you sure you want to delete this address?'}
                    </FormatMessage>
                );
                obj.buttonTitle = msgFormatter('delete')();
                break;
        }
        this.setState({
            title: obj.title,
            msg: obj.msg,
            buttonTitle: obj.buttonTitle,
            form: obj.form,
        });
    };

    processEditClearCustomer = (obj) => {
        if (obj.func) {
            // obj.ContractorCustomerSapID = null;
            // obj.ContractorCustomerName = null;
            // this.props.updateOrderHeader(obj);
            this.props.updateOrderHeader([
                {
                    name: 'ContractorCustomerSapID',
                    value: null,
                    shippingAddress: false,
                },
                {
                    name: 'ContractorCustomerName',
                    value: null,
                    shippingAddress: false,
                },
            ]);
            this.props.updateQuoteContractorCustomer();
        } else {
            this.setCustomersRecent(obj.selectedCustomer, obj.searchType);

            this.props.setCurrentOrderCustomer(obj.selectedCustomer, 'cust');
            this.props.updateQuoteContractorCustomer(obj.selectedCustomer);
        }
    };

    processReengineer = (obj) => {
        var reengItems = obj.QuoteItems.filter(
            (item) => item.uiSelected && item.uiReengineer,
        );

        let catalogReengItems = obj.QuoteItems.filter(
            (item) =>
                item.uiSelected &&
                item.ProductCode !== '0001' &&
                item.ConfigurationType === 0,
        );
        if (reengItems.length > 0 && catalogReengItems.length > 0) {
            var { QuoteItemID, ConfiguratorID, ModelID, Sequence } = reengItems[0];
            this.props.reEngineer(
                {
                    QuoteItemID,
                    ConfiguratorID,
                    ModelID,
                    Sequence,
                    Total: reengItems.length + catalogReengItems.length,
                    counter: 0,
                },
                catalogReengItems,
            );
        } else if (reengItems.length > 0) {
            var { QuoteItemID, ConfiguratorID, ModelID, Sequence } = reengItems[0];
            this.props.reEngineer({
                QuoteItemID,
                ConfiguratorID,
                ModelID,
                Sequence,
                Total: reengItems.length,
                counter: 0,
            });
        } else if (catalogReengItems.length > 0) {
            this.props.validateCatalogQuoteItems(
                catalogReengItems,
                catalogReengItems.length,
            );
        }
    };

    setCustomersRecent = (customer, type) => {
        var cookie = 'Customers:' + type;
        var searchValue = Cookies.read(cookie);
        var searchValues = isEmpty(searchValue) ? [] : searchValue.split(',');

        if (!includes(searchValues, customer.CustomerID)) {
            searchValues.push(customer.CustomerID);
            if (searchValues.length > 10) {
                searchValues.splice(0, 1);
            }
        }

        Cookies.erase(cookie);
        Cookies.create(cookie, searchValues.toString(), 3650);
    };

    handleCommentsChange = (e) => {
        this.setState({ comments: this.refs.deleteComments.value });
    };

    handleResequence = (e) => {
        this.setState({ resequence: !this.state.resequence });
    };

    render() {
        var show = false;
        var obj = this.props.data.deleteObject
            ? this.props.data.deleteObject
            : null;

        if (obj) {
            show = this.props.data.show;
        }

        var disabled = false;
        var userAddress = '';
        switch (this.props.data.deleteType) {
            case deleteType.order:
            case deleteType.panelSchedule:
                if (this.state.comments == '') {
                    disabled = true;
                }
                break;
            case deleteType.quoteItems:
                var selectedItems = this.props.data.deleteObject['QuoteItems'].filter(
                    (item) => item.uiSelected,
                );
                if (selectedItems.length === 0) {
                    disabled = true;
                }
                break;
            case deleteType.userAddress:
                userAddress = `${obj.CompanyName}, ${obj.AddressLine1}, ${obj.City}, ${obj.State}, ${obj.PostalCode}, ${obj.Country}`;
        }

        let showResequenceForm = false;

        if (this.state.form) {
            if (this.props.data.currentQuote) {
                showResequenceForm =
                    this.props.data.currentQuote.Orders === undefined ||
                    this.props.data.currentQuote.Orders.length === 0;
            }
        }

        return (
            <Modal
                show={show}
                id="delete-modal"
                size="sm"
                onHide={handleCloseClick}
                title={title}
                primaryButtonTitle={buttonTitle}
                primaryButtonAction={handleDelete}
                secondaryButtonTitle={<FormatMessage path="cancel">Cancel</FormatMessage>}
                secondaryButtonAction={handleCloseClick}>
                <ContentDiv>
                    <div className="fa-stack warning-icon text-orange">
                        <i className="fal fa-circle fa-stack-2x" />
                        <i className="fal fa-exclamation fa-stack-1x" />
                    </div>
                    <MsgDiv>
                        <div>{msg}</div>
                        {deleteCategory === deleteType.order && (
                            <div className="form-group">
                                <FormatMessage path="comments">Comments</FormatMessage>
                                <textarea
                                    className="form-control mandatory-input"
                                    rows="3"
                                    onChange={handleCommentsChange}
                                />
                            </div>
                        )}
                    </MsgDiv>
                </ContentDiv>
                </Modal>
      );
    }
}
  
    const mapStateToProps = (state) => ({
      data: {
        show: state.Interaction.deleteModal.show,
        deleteObject: state.Interaction.deleteModal.deleteObject,
        deleteType: state.Interaction.deleteModal.deleteType,
        currentQuote: state.Quote.currentQuote,
      },
    });
    
    export default connect(mapStateToProps, {
      deleteQuote,
      deleteFile,
      deleteQuoteItem,
      deleteSelectQuoteItems,
      deleteOrder,
      deleteNote,
      getQuote,
      deleteQuoteVersion,
      deleteNoteTemplate,
      purgeQuoteItemInRecycleBin,
      deleteQuoteAttachment,
      deletePanelSchedule,
      retransmitOrder,
      deleteProposal,
      deleteProposalContact,
      updateOrderHeader,
      updateQuoteContractorCustomer,
      setCurrentOrderCustomer,
      reEngineer,
      showDeleteModal,
      deleteAddress,
      validateCatalogQuoteItems,
    })(DeleteModal);
    
    const ContentDiv = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: 16px;
    `;
    const MsgDiv = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 16px;
    `;
    