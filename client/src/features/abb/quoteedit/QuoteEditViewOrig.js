"use strict";
import React from "react";
import QuoteUnavailable from "components/quote/QuoteUnavailable";
import find from "lodash/find";
import isUndefined from "lodash/isUndefined";
import isNaN from "lodash/isNaN";
import matches from "lodash/matches";
import clone from "lodash/clone";
var Globalize = require("globalize");
require("imports-loader?$=jquery!bootstrap-datepicker");
import DatePicker from "components/util/DatePicker";
import { FormatMessage, FormatDate } from "react-globalize";
import FormInput from "components/util/FormInput";
import GblOption from "components/util/GblOption";
import GblAutoNumericInput from "components/util/GblAutoNumericInput";
import classNames from "classnames";
import { msgFormatter } from "app/util";
import Lessonly from "app/lessonlyIntg";
import { Prompt } from "react-router-dom";
import Tooltip from "components/modals/Tooltip";
import SectionHeader from "components/util/SectionHeader";
import SaveNewQuoteButton from "components/nav/SaveNewQuoteButton";
//  Redux imports
import { connect } from "react-redux";
import {
    showUserSearchModal,
    showCustomerSearchModal
} from "actions/CustomerActions";
import { saveQuote } from "actions/QuoteActions";
import { updateCurrentQuote } from "actions/QuoteActions";
import { showChangeCustomerModal } from "actions/InteractionActions";
import InputForm from "components/generic/InputForm";
import AppCheckBox from "components/util/AppCheckBox";
import { PermissionContext } from "app/contexts/PermissionContext";
import GovernmentRequirementsField from "wwwroot/components/util/GovernmentRequirementsField";

class QuoteEditView extends React.Component {
    static contextType = PermissionContext;

    constructor(props) {
        super(props);

        this.state = {
            quote: clone(props.data.currentQuote),
            changed: false,
            originalIncoTerm: props.data.currentQuote.IncoTerm,
            originalIncoTermDescription:
                props.data.currentQuote.IncoTermDescription,
            governmentFundedAnswer: null
        };
        this.handleCustomerSearchOpen = this.handleCustomerSearchOpen.bind(
            this
        );
        this.handleClearSubmitDateClick = this.handleClearSubmitDateClick.bind(
            this
        );
        this.handleClearDueDateClick = this.handleClearDueDateClick.bind(this);
        this.handleQuoteChange = this.handleQuoteChange.bind(this);
        this.handleOrgChange = this.handleOrgChange.bind(this);
        this.handleChangeEquipmentOwner = this.handleChangeEquipmentOwner.bind(
            this
        );
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    componentDidMount() {
        Lessonly.setKeywords(["addEditQuote"]);
        if (this.refs.quoteName) {
            let str = this.refs.quoteName.value;
            this.refs.quoteName.focus();
            this.refs.quoteName.setSelectionRange(str.length, str.length);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            quote: clone(nextProps.data.currentQuote),
            changed: this.hasChanged(nextProps.data.currentQuote)
        });
    }

    getOrg(orgId) {
        //var orgId = (quote.OrgID ? quote.OrgID : this.props.appData.currentUser.OrgID);
        return find(
            this.props.appData.filters.organizations,
            { OrgID: orgId },
            this
        );
    }

    handleClearDueDateClick(e) {
        this.setState(
            prevState => ({
                ...prevState,
                changed: true,
                quote: {
                    ...prevState.quote,
                    DueDate: null
                }
            }),
            () => {
                this.props.updateCurrentQuote(this.state.quote);
            }
        );
    }

    handleClearEndCustomerClick = e => {
        this.setState(
            prevState => ({
                ...prevState,
                quote: {
                    ...prevState.quote,
                    EndCustomerSapID: null,
                    EndCustomerManager: null,
                    EndCustomerName: null
                }
            }),
            () => {
                this.props.updateCurrentQuote(this.state.quote);
            }
        );
    };

    // get rid of unnecesary variables
    handleCheckbox = () => {
        this.setState(
            prevState => ({
                ...prevState,
                changed: true,
                quote: {
                    ...prevState.quote,
                    PackagingProgressBilling:
                        prevState.quote.PackagingProgressBilling === false
                            ? true
                            : false
                }
            }),
            () => {
                this.props.updateCurrentQuote(this.state.quote);
            }
        );
    };

    handleClearSubmitDateClick(e) {
        this.setState(
            prevState => ({
                ...prevState,
                changed: true,
                quote: {
                    ...prevState.quote,
                    SubmitDate: null
                }
            }),
            () => {
                this.props.updateCurrentQuote(this.state.quote);
            }
        );
    }
    // modal events
    handleCustomerSearchOpen(e) {
        if (!this.isReadOnly() && this.state.quote.StatusID < 4) {
            if (this.state.quote.LastPriceDate) {
                this.props.showChangeCustomerModal(
                    true,
                    function() {
                        this.props.showChangeCustomerModal(false);
                        this.props.showCustomerSearchModal(
                            true,
                            this.props.appData.currentUser
                        );
                    }.bind(this),
                    function() {
                        this.props.showChangeCustomerModal(false);
                    }.bind(this)
                );
            } else {
                this.props.showCustomerSearchModal(
                    true,
                    this.props.appData.currentUser
                );
            }
        }
        e.stopPropagation();
    }

    // special change handler for the org since the default territory must change too.
    handleOrgChange(e) {
        var quote = clone(this.state.quote);
        var orgID = quote.OrgID;
        quote.OrgID = this.refs.orgID.value;
        if (quote.OrgID !== orgID) {
            var org = this.getOrg(quote.OrgID);

            var terr = find(org.Territories, {
                TerritoryID: quote.TerritoryID
            });
            if (!terr) {
                quote.TerritoryID =
                    org && org.Territories && org.Territories.length > 0
                        ? org.Territories[0].TerritoryID
                        : "";
            }
        }

        this.setState({ quote: quote, changed: true });
        this.props.updateCurrentQuote(quote);
    }

    handleQuoteChange(e) {
        if (!this.isReadOnly()) {
            var quote = clone(this.state.quote);
            quote.QuoteName = this.refs.quoteName.value;
            //quote.DueDate = this.refs.dueDate).value();
            quote.DueDate = this.refs.dueDate.value();
            quote.SubmitDate = this.refs.submitDate.value();
            quote.OrgID = this.refs.orgID.value;
            quote.TerritoryID = this.refs.territoryID.value;
            quote.ChannelType = this.refs.channelType.value;
            quote.Description = this.refs.description.value;
            quote.CurrencyCode = this.refs.currency.value;
            quote.CultureCode = this.refs.culture.value;
            quote.PONumber =
                this.refs.poNumber &&
                this.refs.poNumber.value !== null &&
                this.refs.poNumber.value !== ""
                    ? this.refs.poNumber.value
                    : null;
            quote.POValue = this.refs.poValue ? this.refs.poValue.value() : 0;
            this.setState({ quote: quote, changed: true });
            this.props.updateCurrentQuote(quote);
        }
    }

    handleIncoTermChange = e => {
        if (!this.isReadOnly()) {
            var quote = clone(this.state.quote);

            quote.IncoTerm = e.target.value.split(" - ")[0];
            quote.IncoTermDescription = e.target.value.split(" - ")[1];

            this.setState({ quote: quote, changed: true });
            this.props.updateCurrentQuote(quote);
        }
    };

    handleUserSearchOpen = (e, view) => {
        this.props.showUserSearchModal(true, null, false, view);
        e.stopPropagation();
    };

    hasChanged(quote) {
        var matcher = matches(this.props.data.currentQuoteBaseline);
        var rtn = matcher(quote);
        return !rtn;
    }

    isReadOnly() {
        var quote = this.state.quote;
        return (
            !quote ||
            quote.UserAuth ||
            quote.StatusID === 2 ||
            quote.StatusID > 4
        );
    }

    handleChangeEquipmentOwner = (e, id) => {
        this.setState(
            prevState => ({
                ...prevState,
                quote: {
                    ...prevState.quote,
                    EquipmentOwner: {
                        ...prevState.quote.EquipmentOwner,
                        [id]: e.target.value
                    }
                }
            }),
            () => {
                this.props.updateCurrentQuote(this.state.quote);
            }
        );
    };

    handleWillAdviseChange = willAdvise => {
        const newValue = willAdvise ? "Will Advise" : "";
        this.setState(
            prevState => ({
                ...prevState,
                quote: {
                    ...prevState.quote,
                    EquipmentOwner: {
                        CompanyName: newValue,
                        StreetAddress: newValue,
                        City: newValue,
                        State: newValue,
                        ZipCode: newValue,
                        PhoneNumber: newValue
                    }
                }
            }),
            () => {
                this.props.updateCurrentQuote(this.state.quote);
            }
        );
    };

    handleGovernmentFundedChange = val => {
        const governmentFundedAnswer = val;
        let quote = {
            ...this.state.quote,
            GovernmentFundedAnswer: governmentFundedAnswer
        };
        this.setState({ quote: quote, changed: true, governmentFundedAnswer });
        this.props.updateCurrentQuote(quote);
    };

    render() {
        var quote = this.state.quote;
        let sectionTitle = "";
        let accountTitle = msgFormatter("accountDetails")();
        let poTitle = msgFormatter("poDetails")();
        const equipmentOwnerFormInstruction = msgFormatter(
            "equipmentOwnerFormInstruction"
        )();
        const equipmentOwner = quote.EquipmentOwner;
        const priorOrderExists =
            (quote.PackagingProject && quote.Orders?.length > 0) ||
            quote.Orders?.filter(o => o.SAPSalesOrderEquip !== null).length > 0;

        const missingAllEntries =
            !equipmentOwner ||
            ((!equipmentOwner.CompanyName ||
                equipmentOwner.CompanyName.trim() === "") &&
                (!equipmentOwner.StreetAddress ||
                    equipmentOwner.StreetAddress.trim() === "") &&
                (!equipmentOwner.City || equipmentOwner.City.trim() === "") &&
                (!equipmentOwner.State || equipmentOwner.State.trim() === "") &&
                (!equipmentOwner.ZipCode ||
                    equipmentOwner.ZipCode.trim() === "") &&
                (!equipmentOwner.PhoneNumber ||
                    equipmentOwner.PhoneNumber.trim() === ""));
        const hideEquipmentOwnerSection =
            !quote.EquipmentOwnerEnabled ||
            (quote.HasEquipment && priorOrderExists && missingAllEntries);
        let equipOwnerForms = [];
        if (!hideEquipmentOwnerSection && quote.HasEquipment) {
            equipOwnerForms = [
                {
                    labelText: msgFormatter("companyName")(),
                    type: "text",
                    id: "CompanyName",
                    name: "CompanyName",
                    value: this.state.quote.EquipmentOwner?.CompanyName ?? "",
                    className: "form-control",
                    colSize: "col-xs-12 col-sm-12",
                    maxLength: 100
                },
                {
                    labelText: msgFormatter("address")(),
                    type: "text",
                    id: "StreetAddress",
                    name: "StreetAddress",
                    value: this.state.quote.EquipmentOwner?.StreetAddress ?? "",
                    className: "form-control",
                    colSize: "col-xs-12 col-sm-12",
                    maxLength: 100
                },
                {
                    labelText: msgFormatter("city")(),
                    type: "text",
                    id: "City",
                    name: "City",
                    value: this.state.quote.EquipmentOwner?.City ?? "",
                    className: "form-control",
                    colSize: "col-xs-12 col-sm-6",
                    maxLength: 50
                },
                {
                    labelText: msgFormatter("state")(),
                    type: "text",
                    id: "State",
                    name: "State",
                    value: this.state.quote.EquipmentOwner?.State ?? "",
                    className: "form-control",
                    colSize: "col-xs-12 col-sm-6",
                    maxLength: 50
                },
                {
                    labelText: msgFormatter("postalCode")(),
                    type: "text",
                    id: "ZipCode",
                    name: "ZipCode",
                    value: this.state.quote.EquipmentOwner?.ZipCode ?? "",
                    className: "form-control",
                    colSize: "col-xs-12 col-sm-6",
                    maxLength: 15
                },
                {
                    labelText: msgFormatter("phone")(),
                    type: "text",
                    id: "PhoneNumber",
                    name: "PhoneNumber",
                    value: this.state.quote.EquipmentOwner?.PhoneNumber ?? "",
                    className: "form-control",
                    colSize: "col-xs-12 col-sm-6",
                    maxLength: 20
                }
            ];
        }

        if (quote === null) {
            return <QuoteUnavailable />;
        } else {
            const prmpt = msgFormatter("unsavedQuotePrompt")();

            var status = msgFormatter(
                "server/status/short/" + quote.StatusID
            )();
            sectionTitle =
                quote.QuoteID === "00000000-0000-0000-0000-000000000000"
                    ? msgFormatter("addNewQuote")()
                    : msgFormatter("editQuote")();
            var newQuote =
                quote.QuoteID === "00000000-0000-0000-0000-000000000000";
            // set up the style for the status
            var statusClasses = "quote-status-" + quote.StatusID;

            if (
                quote.CustomerID == null &&
                !this.props.appData.currentUser.Profile.Internal &&
                this.props.appData.currentUser.Accounts
            ) {
                var accounts = clone(this.props.appData.currentUser.Accounts);

                if (accounts.length == 1) {
                    var account = accounts[0];
                    quote.CustomerID = account.CustomerID;
                    quote.CustomerName = account.Name;
                    quote.CustomerDisplayName = account.DisplayName;
                    quote.SalesForceID = account.SalesForceID;
                    quote.SapID = account.SapID;
                    quote.CurrencyCode = account.Currency;

                    //there is a slight chance that an sapcustomer does not have a
                    //sales territory defined, most likely direct or internal
                    if (account.TerritoryID) {
                        quote.TerritoryID = account.TerritoryID;
                        quote.OrgID = account.OrgID;
                    } else {
                        quote.TerritoryID = this.props.appData.currentUser.TerritoryID;
                        quote.OrgID = this.props.appData.currentUser.OrgID;
                    }
                }
                if (accounts.length > 0) {
                    var account = accounts[0];

                    quote.TerritoryID = this.props.appData.currentUser
                        .TerritoryID
                        ? this.props.appData.currentUser.TerritoryID
                        : account.TerritoryID;
                    quote.OrgID = this.props.appData.currentUser.OrgID
                        ? this.props.appData.currentUser.OrgID
                        : account.OrgID;
                }
            }

            // determine the org and territory (check quote and fallback to settings for current user)
            var orgId = quote.OrgID
                ? quote.OrgID
                : this.props.appData.currentUser.OrgID;
            var territoryId = quote.TerritoryID
                ? quote.TerritoryID
                : this.props.appData.currentUser.TerritoryID;

            var org = this.getOrg(orgId);
            var terrs = org && org.Territories ? org.Territories : [];
            var quoteCurrency = quote.CurrencyCode
                ? quote.CurrencyCode
                : this.props.appData.currentUser.CurrencyCode;
            var quoteCulture = quote.CultureCode
                ? quote.CultureCode
                : this.props.appData.currentUser.CultureCode;

            //most customers will have an SapID, only SFDC Quotes *could* only have a DUNS
            //if SAP customer we will lock Org, territory, Currency based on Account
            var sapCustomer = !(
                isUndefined(quote.SapID) || quote.SapID === null
            );

            var quoteName = quote.QuoteName !== null ? quote.QuoteName : "";
            var quoteDescription =
                isUndefined(quote.Description) || quote.Description === null
                    ? ""
                    : quote.Description;

            // set up the state of the quote (editable or not)
            var disabled = this.isReadOnly() ? true : false;
            var external = !this.props.appData.currentUser.Profile.Internal;
            var userHasCost = this.context.isInRole("Cost");

            // preformat dates to account for potential nulls
            var fmtr = Globalize("en").dateFormatter();

            var dueDate = quote.DueDate ? fmtr(new Date(quote.DueDate)) : "";
            var submitDate = quote.SubmitDate
                ? fmtr(new Date(quote.SubmitDate))
                : "";

            // create a map of the orgs, territories, cultures, and currencies for the selects
            var orgs =
                !org && quote.Organization ? (
                    <option
                        key={quote.Organization.OrgID}
                        value={quote.Organization.OrgID}
                    >
                        {quote.Organization.Description}
                    </option>
                ) : (
                    this.props.appData.filters.organizations.map(function(org) {
                        return (
                            <option key={org.OrgID} value={org.OrgID}>
                                {org.Description}
                            </option>
                        );
                    }, this)
                );

            var territories =
                terrs.length == 0 && quote.Territory ? (
                    <option
                        key={quote.Territory.TerritoryID}
                        value={quote.Territory.TerritoryID}
                    >
                        {quote.Territory.Description}
                    </option>
                ) : (
                    terrs.map(function(terr) {
                        return (
                            <option
                                key={terr.TerritoryID}
                                value={terr.TerritoryID}
                            >
                                {terr.Description}
                            </option>
                        );
                    }, this)
                );

            var cultures = this.props.appData.filters.cultures.map(function(
                culture
            ) {
                return (
                    <GblOption
                        key={culture.CultureCode}
                        value={culture.CultureCode}
                        gblKey={`server/cultureCode/${culture.CultureCode}`}
                        defaultText={culture.Description}
                    />
                );
            },
            this);

            var currencies = this.props.appData.filters.currencies.map(function(
                currency
            ) {
                return (
                    <GblOption
                        key={currency.CurrencyCode}
                        value={currency.CurrencyCode}
                        gblKey={`server/currency/${currency.CurrencyCode}`}
                        defaultText={currency.Description}
                    />
                );
            },
            this);

            var channelTypes = this.props.appData.filters.channelTypes.map(
                function(channel) {
                    // this is a hack because we don't have access to the source of the customer (source resides on the customer master table in hubservices)
                    // it is only needed for ELSE implementation -- it can be taken out after ELDS goes online
                    var source =
                        quote.OrgID == "2010" || quote.OrgID == "US35"
                            ? "AMSAP"
                            : "SAP";
                    if (source == channel.Source) {
                        return (
                            <GblOption
                                key={channel.ChannelType}
                                value={channel.ChannelType}
                                gblKey={`server/channelType/${channel.Source}/${channel.ChannelType}`}
                                defaultText={channel.Description}
                            />
                        );
                    }
                },
                this
            );

            var incoTermsControl = null;
            var incoTermsOptions = null;
            if (!external) {
                var incoTerms = msgFormatter("noTermsListed");
                if (quote.IncoTerm && quote.IncoTerm !== "") {
                    incoTerms =
                        quote.IncoTerm + " - " + quote.IncoTermDescription;
                }

                if (disabled || !userHasCost || quote.StatusID === 4) {
                    incoTermsControl = (
                        <li className="col-xs-12">
                            <div className="form-group">
                                <label>
                                    <FormatMessage path="incoTermsLabel">
                                        Incoterm
                                    </FormatMessage>
                                </label>
                                <p title={incoTerms}>{incoTerms}</p>
                            </div>
                        </li>
                    );
                } else {
                    incoTermsOptions = this.props.appData.filters.incoTerms.map(
                        item => {
                            return (
                                <option key={item.Key} value={item.Key}>
                                    {item.Key} ({item.Name})
                                </option>
                            );
                        }
                    );
                    if (
                        quote.IncoTerm &&
                        quote.IncoTerm !== null &&
                        quote.IncoTermDescription &&
                        quote.IncoTermDescription !== null
                    ) {
                        var item = find(this.props.appData.filters.incoTerms, {
                            IncoTermID: quote.IncoTerm,
                            IncoTermDescription: quote.IncoTermDescription
                        });
                        if (!item) {
                            incoTermsOptions.unshift(
                                <option
                                    key={
                                        quote.IncoTerm +
                                        " - " +
                                        quote.IncoTermDescription
                                    }
                                    value={
                                        quote.IncoTerm +
                                        " - " +
                                        quote.IncoTermDescription
                                    }
                                >
                                    {quote.IncoTerm +
                                        " - " +
                                        quote.IncoTermDescription}
                                </option>
                            );
                        }
                    }

                    incoTermsControl = (
                        <li className="col-xs-12">
                            <div className="form-group">
                                <label>
                                    <FormatMessage path="incoTermsLabel">
                                        Incoterm
                                    </FormatMessage>
                                </label>
                                <select
                                    ref="incoTerms"
                                    onChange={this.handleIncoTermChange}
                                    className="form-control"
                                    value={incoTerms}
                                >
                                    {incoTermsOptions}
                                </select>
                            </div>
                        </li>
                    );
                }
            }

            var poNumber = quote.PONumber !== null ? quote.PONumber : "";
            var poValue = isNaN(quote.POValue) ? 0 : quote.POValue;
            var totalQuoteValue = isNaN(quote.QuoteValueGE)
                ? 0
                : quote.QuoteValueGE;
            var minPOValue = totalQuoteValue * 0.95,
                maxPOValue = totalQuoteValue * 1.05;
            var isPOInvalid =
                poValue > 0
                    ? poValue < minPOValue || poValue > maxPOValue
                    : false;
            var poValueValidationMessage = msgFormatter(
                "validation/poValueOutOfRange"
            )(5);
            var poRequiredClass = classNames("form-control", {
                "mandatory-input":
                    (poNumber !== null && poNumber !== "") || poValue > 0
                        ? true
                        : false
            });
            var poValueDisabled =
                disabled ||
                (this.props.data.priceValidationData
                    ? !this.props.data.priceValidationData.Valid
                    : false) ||
                !quote.QuoteItems ||
                quote.QuoteItems.length === 0;

            var poNumberInput = null;
            var poValueInput = null;
            if (!this.props.appData.currentUser.Profile.EndUser) {
                poNumberInput = (
                    <li className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label>
                                <FormatMessage path="poNumber">
                                    PO No.
                                </FormatMessage>
                            </label>
                            <input
                                ref="poNumber"
                                className={poRequiredClass}
                                type="text"
                                maxLength="35"
                                onChange={this.handleQuoteChange}
                                disabled={
                                    poValueDisabled ||
                                    quote.Orders?.length > 0 ||
                                    quote.ManualOrders?.length > 0
                                }
                                value={poNumber}
                            />
                        </div>
                    </li>
                );
                poValueInput = (
                    <li className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label>
                                <FormatMessage path="poValue">
                                    PO Value
                                </FormatMessage>
                            </label>
                            <GblAutoNumericInput
                                ref="poValue"
                                className={poRequiredClass}
                                mDec={2}
                                vMin={0}
                                onChange={this.handleQuoteChange}
                                disabled={poValueDisabled}
                                value={poValue}
                            />
                            <span
                                className="error-text error-messages"
                                style={
                                    isPOInvalid ? { display: "block" } : null
                                }
                            >
                                {poValueValidationMessage}
                            </span>
                        </div>
                    </li>
                );
            }

            const accountToolTip = msgFormatter("accountToolTip")();
            const amSoldToAccountToolTip = msgFormatter(
                "amSoldToAccountToolTip"
            )();
            const endUserToolTip = msgFormatter("endUserToolTip")();
            const amEndUserToolTip = msgFormatter("amEndUserToolTip")();
            const outputLanguageToolTip = msgFormatter(
                "outputLanguageToolTip"
            )();

            var endCustomerVal;
            var ecSearch;
            var ecDisabled =
                quote.UserAuth || quote.StatusID === 2 || quote.StatusID > 4;

            if (quote.EndCustomerSapID) {
                endCustomerVal =
                    quote.EndCustomerSapID + ", " + quote.EndCustomerName;
            }

            if (!ecDisabled) {
                ecSearch = (
                    <li className="col-xs-6 ">
                        <div className="form-group">
                            <label>
                                <FormatMessage path="endUser">
                                    End User
                                </FormatMessage>
                                <Tooltip title={endUserToolTip} bsClass="black">
                                    <div className="account-tool-tip section-icon small">
                                        <i className="fal fa-question-circle" />
                                    </div>
                                </Tooltip>
                                {endCustomerVal ? (
                                    <a
                                        className="clear-date"
                                        onClick={
                                            this.handleClearEndCustomerClick
                                        }
                                    >
                                        <FormatMessage path="clear">
                                            Clear
                                        </FormatMessage>
                                    </a>
                                ) : null}
                            </label>
                            <div className="input-group">
                                <FormInput
                                    onClick={e =>
                                        this.handleUserSearchOpen(e, "ec")
                                    }
                                    style={{ cursor: "pointer" }}
                                    type="text"
                                    className="form-control"
                                    value={endCustomerVal ? endCustomerVal : ""}
                                    placeholder="optional"
                                    readOnly
                                />
                                <span
                                    onClick={e =>
                                        this.handleUserSearchOpen(e, "ec")
                                    }
                                    className="input-group-addon ge-hover-pointer"
                                    value="cust"
                                    style={{ backgroundColor: "transparent" }}
                                >
                                    <i className="fa fa-search" />
                                </span>
                            </div>
                        </div>
                    </li>
                );
            } else {
                ecSearch = (
                    <li className="col-xs-6">
                        <div className="form-group col-xs-6">
                            <label>
                                <FormatMessage path="endUser">
                                    End User
                                </FormatMessage>
                                <Tooltip title={endUserToolTip} bsClass="black">
                                    <div className="account-tool-tip section-icon small">
                                        <i className="fal fa-question-circle" />
                                    </div>
                                </Tooltip>
                            </label>
                            <FormInput
                                type="text"
                                className="form-control"
                                disabled={ecDisabled}
                                value={endCustomerVal ? endCustomerVal : ""}
                            />
                        </div>
                    </li>
                );
            }

            // Government Funding
            let disableSave = false;
            let requireGovFunded = this.props.appData.configuration
                .RequireGovFundedAnswer;

            if (requireGovFunded && newQuote) {
                if (
                    this.state.governmentFundedAnswer === "yes" ||
                    this.state.governmentFundedAnswer === null
                ) {
                    disableSave = true;
                }
            }

            return (
                <div>
                    <Prompt when={this.state.changed} message={() => prmpt} />
                    <section>
                        <div className="container">
                            <SectionHeader
                                headerTitle={sectionTitle}
                                customStyle={{
                                    marginRight: 15,
                                    marginLeft: 15
                                }}
                            >
                                <SaveNewQuoteButton
                                    data={this.props.data}
                                    history={this.props.history}
                                    disabled={disableSave}
                                />
                            </SectionHeader>
                            {/*  */}
                            <div className="col-xs-12 col-md-6">
                                <form className="add-new-quote-form">
                                    <div className="add-new-quote-form-wrapper">
                                        <ul className="row config-row">
                                            <li className="col-xs-12">
                                                <div className="form-group">
                                                    <label>
                                                        <FormatMessage path="quoteName">
                                                            Quote Name
                                                        </FormatMessage>
                                                    </label>
                                                    <input
                                                        ref="quoteName"
                                                        type="text"
                                                        maxLength="50"
                                                        onChange={
                                                            this
                                                                .handleQuoteChange
                                                        }
                                                        disabled={
                                                            disabled ||
                                                            quote.StatusID >= 4
                                                        }
                                                        className="form-control mandatory-input"
                                                        value={quoteName}
                                                    />
                                                </div>
                                            </li>
                                            <li className="col-xs-12 col-sm-6">
                                                <div className="form-group">
                                                    <label>
                                                        <FormatMessage path="dueDate">
                                                            Due Date
                                                        </FormatMessage>
                                                        {dueDate ? (
                                                            <a
                                                                className="clear-date"
                                                                onClick={
                                                                    this
                                                                        .handleClearDueDateClick
                                                                }
                                                            >
                                                                <FormatMessage path="clear">
                                                                    Clear
                                                                </FormatMessage>
                                                            </a>
                                                        ) : null}
                                                    </label>
                                                    <DatePicker
                                                        ref="dueDate"
                                                        locale={
                                                            Globalize.locale()
                                                                .locale
                                                        }
                                                        disabled={disabled}
                                                        dateValue={dueDate}
                                                        todayHighlight={true}
                                                        clearBtn={false}
                                                        onDateChange={
                                                            this
                                                                .handleQuoteChange
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="col-xs-12 col-sm-6">
                                                <div className="form-group">
                                                    <label>
                                                        <FormatMessage path="submitDate">
                                                            Submit Date
                                                        </FormatMessage>
                                                        {submitDate ? (
                                                            <a
                                                                className="clear-date"
                                                                onClick={
                                                                    this
                                                                        .handleClearSubmitDateClick
                                                                }
                                                            >
                                                                <FormatMessage path="clear">
                                                                    Clear
                                                                </FormatMessage>
                                                            </a>
                                                        ) : null}
                                                    </label>
                                                    <DatePicker
                                                        ref="submitDate"
                                                        locale={
                                                            Globalize.locale()
                                                                .locale
                                                        }
                                                        disabled={disabled}
                                                        dateValue={submitDate}
                                                        todayHighlight={true}
                                                        clearBtn={false}
                                                        onDateChange={
                                                            this
                                                                .handleQuoteChange
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="col-xs-12">
                                                <div className="form-group">
                                                    <label>
                                                        <FormatMessage path="description">
                                                            Description
                                                        </FormatMessage>
                                                    </label>
                                                    <textarea
                                                        ref="description"
                                                        className="form-control"
                                                        disabled={disabled}
                                                        onChange={
                                                            this
                                                                .handleQuoteChange
                                                        }
                                                        value={quoteDescription}
                                                        style={{
                                                            height: "116px"
                                                        }}
                                                    />
                                                </div>
                                            </li>
                                            <li className="col-xs-12">
                                                <div
                                                    className="form-group"
                                                    style={
                                                        quote.PackagingProgressBillingEnabled ||
                                                        newQuote
                                                            ? { color: "#000" }
                                                            : {
                                                                  color:
                                                                      "#a7acac"
                                                              }
                                                    }
                                                >
                                                    {this.props.appData
                                                        .currentUser.Profile
                                                        .Internal ? (
                                                        <AppCheckBox
                                                            id="progressBilling"
                                                            labelPath="progressBilling"
                                                            onChange={() =>
                                                                this.handleCheckbox()
                                                            }
                                                            checked={
                                                                quote.PackagingProgressBilling
                                                            }
                                                            disabled={
                                                                !quote.PackagingProgressBillingEnabled &&
                                                                !newQuote
                                                            }
                                                        />
                                                    ) : null}
                                                </div>
                                            </li>
                                            {!newQuote ? (
                                                <React.Fragment>
                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="salesOrgRegion">
                                                                    Sales
                                                                    Organization/Region
                                                                </FormatMessage>
                                                            </label>
                                                            <select
                                                                ref="orgID"
                                                                disabled={
                                                                    disabled ||
                                                                    newQuote ||
                                                                    sapCustomer ||
                                                                    external
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleOrgChange
                                                                }
                                                                className="form-control"
                                                                value={orgId}
                                                            >
                                                                {orgs}
                                                            </select>
                                                        </div>
                                                    </li>
                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="territory">
                                                                    Territory
                                                                </FormatMessage>
                                                            </label>
                                                            <select
                                                                ref="territoryID"
                                                                disabled={
                                                                    disabled ||
                                                                    newQuote ||
                                                                    sapCustomer ||
                                                                    external
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleQuoteChange
                                                                }
                                                                className="form-control"
                                                                value={
                                                                    territoryId !=
                                                                    null
                                                                        ? territoryId
                                                                        : ""
                                                                }
                                                            >
                                                                {territories}
                                                            </select>
                                                        </div>
                                                    </li>
                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="channelType">
                                                                    Channel Type
                                                                </FormatMessage>
                                                            </label>
                                                            <select
                                                                ref="channelType"
                                                                disabled={
                                                                    disabled ||
                                                                    newQuote ||
                                                                    sapCustomer ||
                                                                    external
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleQuoteChange
                                                                }
                                                                className="form-control"
                                                                value={
                                                                    quote.ChannelType
                                                                }
                                                            >
                                                                {channelTypes}
                                                            </select>
                                                        </div>
                                                    </li>
                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="currency">
                                                                    Currency
                                                                </FormatMessage>
                                                            </label>
                                                            <select
                                                                ref="currency"
                                                                disabled={
                                                                    disabled ||
                                                                    newQuote ||
                                                                    sapCustomer ||
                                                                    external
                                                                }
                                                                className="form-control"
                                                                onChange={
                                                                    this
                                                                        .handleQuoteChange
                                                                }
                                                                value={
                                                                    quoteCurrency !=
                                                                    null
                                                                        ? quoteCurrency
                                                                        : ""
                                                                }
                                                            >
                                                                {currencies}
                                                            </select>
                                                        </div>
                                                    </li>

                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="outputLanguage">
                                                                    Output
                                                                    Language
                                                                </FormatMessage>
                                                                <Tooltip
                                                                    title={
                                                                        outputLanguageToolTip
                                                                    }
                                                                    bsClass="black"
                                                                >
                                                                    <div className="account-tool-tip">
                                                                        <i className="fal fa-question-circle" />
                                                                    </div>
                                                                </Tooltip>
                                                            </label>
                                                            <select
                                                                ref="culture"
                                                                disabled={
                                                                    disabled
                                                                }
                                                                className="form-control"
                                                                onChange={
                                                                    this
                                                                        .handleQuoteChange
                                                                }
                                                                value={
                                                                    quoteCulture
                                                                }
                                                            >
                                                                {cultures}
                                                            </select>
                                                        </div>
                                                    </li>
                                                    {/* Govt Funded */}
                                                    {requireGovFunded && (
                                                        <li className="col-xs-12">
                                                            <GovernmentRequirementsField
                                                                governmentFundedAnswer={
                                                                    this.props
                                                                        .data
                                                                        .currentQuote
                                                                        .GovernmentFunded
                                                                        ? "yes"
                                                                        : this
                                                                              .props
                                                                              .data
                                                                              .currentQuote
                                                                              .DomesticPreference
                                                                        ? "dpo"
                                                                        : "no"
                                                                }
                                                                domesticPreference={
                                                                    this.props
                                                                        .data
                                                                        .currentQuote
                                                                        .DomesticPreference
                                                                }
                                                                isExternal={
                                                                    this.props
                                                                        .appData
                                                                        .currentUser
                                                                        .Profile
                                                                        .External
                                                                }
                                                                readOnly={true}
                                                                govFundedYesDisabled={
                                                                    this.props
                                                                        .data
                                                                        .currentQuote
                                                                        .GovernmentFundedAnswer !==
                                                                    "yes"
                                                                }
                                                                govFundedNoDisabled={
                                                                    this.props
                                                                        .data
                                                                        .currentQuote
                                                                        .GovernmentFundedAnswer !==
                                                                    "no"
                                                                }
                                                                dpoDisabled={
                                                                    this.props
                                                                        .data
                                                                        .currentQuote
                                                                        .GovernmentFundedAnswer !==
                                                                    "dpo"
                                                                }
                                                                hideWarning={
                                                                    true
                                                                }
                                                            />
                                                        </li>
                                                    )}

                                                    <li className="col-xs-12 col-sm-6">
                                                        {function(
                                                            external,
                                                            opportunityNo
                                                        ) {
                                                            if (
                                                                !external &&
                                                                opportunityNo
                                                            ) {
                                                                return (
                                                                    <div className="form-group">
                                                                        <label>
                                                                            <FormatMessage path="opportunity">
                                                                                Opportunity
                                                                            </FormatMessage>
                                                                        </label>
                                                                        <p>
                                                                            {
                                                                                quote.OpportunityNo
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                );
                                                            }
                                                        }.bind(this)(
                                                            external,
                                                            quote.OpportunityNo
                                                        )}
                                                    </li>
                                                </React.Fragment>
                                            ) : null}
                                        </ul>
                                        {!newQuote ? (
                                            <ul className="row config-row">
                                                <li className="col-xs-6 col-sm-4 ">
                                                    <div className="form-group">
                                                        <label>
                                                            <FormatMessage path="createdBy">
                                                                Created By
                                                            </FormatMessage>
                                                        </label>
                                                        <p>
                                                            {quote.CreatedUser}{" "}
                                                            |{" "}
                                                            <FormatDate>
                                                                {
                                                                    new Date(
                                                                        quote.CreatedDate
                                                                    )
                                                                }
                                                            </FormatDate>
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="col-xs-6 col-sm-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <FormatMessage path="lastChanged">
                                                                Last Changed
                                                            </FormatMessage>
                                                        </label>
                                                        <p>
                                                            {quote.ModifiedUser}{" "}
                                                            |{" "}
                                                            <FormatDate>
                                                                {
                                                                    new Date(
                                                                        quote.ModifiedDate
                                                                    )
                                                                }
                                                            </FormatDate>
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="col-xs-6 col-sm-4">
                                                    <div className="form-group">
                                                        <label>
                                                            <FormatMessage path="status">
                                                                Status
                                                            </FormatMessage>
                                                        </label>
                                                        <p
                                                            className={
                                                                statusClasses
                                                            }
                                                        >
                                                            {status}
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        ) : null}
                                    </div>
                                </form>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <form className="add-new-quote-form">
                                    <div className="add-new-quote-form-wrapper">
                                        {!newQuote ? (
                                            <div
                                                style={{
                                                    borderBottom:
                                                        "1px solid #cacdd0",
                                                    padding: "0 0 5px 0",
                                                    marginBottom: "10px"
                                                }}
                                            >
                                                <span
                                                    style={{ fontSize: "18px" }}
                                                >
                                                    {accountTitle}
                                                </span>
                                            </div>
                                        ) : null}
                                        <ul className="row config-row">
                                            <li
                                                className={
                                                    newQuote
                                                        ? "col-xs-12"
                                                        : "col-xs-12 col-sm-6"
                                                }
                                            >
                                                <div className="form-group">
                                                    <label>
                                                        <FormatMessage path="soldToAccount">
                                                            Sold to Account
                                                        </FormatMessage>
                                                        <Tooltip
                                                            title={
                                                                accountToolTip
                                                            }
                                                            bsClass="black"
                                                        >
                                                            <div className="account-tool-tip section-icon small">
                                                                <i className="fal fa-question-circle" />
                                                            </div>
                                                        </Tooltip>
                                                    </label>
                                                    <div className="input-group">
                                                        <input
                                                            onClick={
                                                                this
                                                                    .handleCustomerSearchOpen
                                                            }
                                                            style={{
                                                                cursor:
                                                                    "pointer"
                                                            }}
                                                            type="text"
                                                            className="form-control mandatory-input"
                                                            value={
                                                                quote.CustomerDisplayName !==
                                                                null
                                                                    ? quote.CustomerDisplayName
                                                                    : ""
                                                            }
                                                            readOnly={
                                                                !disabled &&
                                                                !(
                                                                    quote.StatusID >=
                                                                    4
                                                                )
                                                            }
                                                            disabled={
                                                                disabled ||
                                                                quote.StatusID >=
                                                                    4
                                                            }
                                                        />
                                                        <span
                                                            onClick={
                                                                this
                                                                    .handleCustomerSearchOpen
                                                            }
                                                            className="input-group-addon quote-hover"
                                                            style={{
                                                                backgroundColor:
                                                                    "transparent"
                                                            }}
                                                        >
                                                            <i className="fa fa-search" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                            {!newQuote ? (
                                                <li
                                                    className="col-xs-12 col-sm-6"
                                                    style={{
                                                        height: "68px"
                                                    }}
                                                >
                                                    <div className="form-group">
                                                        <label
                                                            style={{
                                                                color: endCustomerVal
                                                                    ? "#a7acac"
                                                                    : "#000000"
                                                            }}
                                                        >
                                                            <FormatMessage path="accountManagerSoldToAccount">
                                                                Account Manager
                                                                (Sold To
                                                                Account)
                                                            </FormatMessage>
                                                            <Tooltip
                                                                title={
                                                                    amSoldToAccountToolTip
                                                                }
                                                                bsClass="black"
                                                            >
                                                                <div className="account-tool-tip section-icon small">
                                                                    <i className="fal fa-question-circle" />
                                                                </div>
                                                            </Tooltip>
                                                        </label>
                                                        <div
                                                            className="input-group"
                                                            style={{
                                                                lineHeight:
                                                                    "34px",
                                                                color: endCustomerVal
                                                                    ? "#a7acac"
                                                                    : "#000000"
                                                            }}
                                                        >
                                                            {
                                                                quote.CustomerManager
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            ) : null}
                                        </ul>

                                        <React.Fragment>
                                            <ul className="row config-row">
                                                {ecSearch}
                                                {endCustomerVal ? (
                                                    <li
                                                        className="col-xs-12 col-sm-6"
                                                        style={{
                                                            height: "68px"
                                                        }}
                                                    >
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="accountManagerEndUser">
                                                                    Account
                                                                    Manager (End
                                                                    User)
                                                                </FormatMessage>
                                                                <Tooltip
                                                                    title={
                                                                        amEndUserToolTip
                                                                    }
                                                                    bsClass="black"
                                                                >
                                                                    <div className="account-tool-tip section-icon small">
                                                                        <i className="fal fa-question-circle" />
                                                                    </div>
                                                                </Tooltip>
                                                            </label>
                                                            <div
                                                                className="input-group"
                                                                style={{
                                                                    lineHeight:
                                                                        "34px"
                                                                }}
                                                            >
                                                                {
                                                                    quote.EndCustomerManager
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    <li
                                                        className="col-xs-0 col-sm-6"
                                                        style={{
                                                            height: "68px"
                                                        }}
                                                    />
                                                )}
                                            </ul>
                                        </React.Fragment>
                                        {!newQuote ? (
                                            <React.Fragment>
                                                
                                                <div
                                                    style={{
                                                        borderBottom:
                                                            "1px solid #cacdd0",
                                                        padding: "0 0 5px 0",
                                                        marginBottom: "10px"
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "18px"
                                                        }}
                                                    >
                                                        {poTitle}
                                                    </span>
                                                </div>
                                                <ul className="row config-row">
                                                    {poNumberInput}
                                                    {poValueInput}
                                                    {incoTermsControl}
                                                </ul>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <ul className="row config-row">
                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="salesOrgRegion">
                                                                    Sales
                                                                    Organization/Region
                                                                </FormatMessage>
                                                            </label>
                                                            <select
                                                                ref="orgID"
                                                                disabled={
                                                                    disabled ||
                                                                    newQuote ||
                                                                    sapCustomer ||
                                                                    external
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleOrgChange
                                                                }
                                                                className="form-control"
                                                                value={orgId}
                                                            >
                                                                {orgs}
                                                            </select>
                                                        </div>
                                                    </li>
                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="territory">
                                                                    Territory
                                                                </FormatMessage>
                                                            </label>
                                                            <select
                                                                ref="territoryID"
                                                                disabled={
                                                                    disabled ||
                                                                    newQuote ||
                                                                    sapCustomer ||
                                                                    external
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleQuoteChange
                                                                }
                                                                className="form-control"
                                                                value={
                                                                    territoryId !=
                                                                    null
                                                                        ? territoryId
                                                                        : ""
                                                                }
                                                            >
                                                                {territories}
                                                            </select>
                                                        </div>
                                                    </li>
                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="channelType">
                                                                    Channel Type
                                                                </FormatMessage>
                                                            </label>
                                                            <select
                                                                ref="channelType"
                                                                disabled={
                                                                    disabled ||
                                                                    newQuote ||
                                                                    sapCustomer ||
                                                                    external
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleQuoteChange
                                                                }
                                                                className="form-control"
                                                                value={
                                                                    quote.ChannelType
                                                                }
                                                            >
                                                                {channelTypes}
                                                            </select>
                                                        </div>
                                                    </li>
                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="currency">
                                                                    Currency
                                                                </FormatMessage>
                                                            </label>
                                                            <select
                                                                ref="currency"
                                                                disabled={
                                                                    disabled ||
                                                                    newQuote ||
                                                                    sapCustomer ||
                                                                    external
                                                                }
                                                                className="form-control"
                                                                onChange={
                                                                    this
                                                                        .handleQuoteChange
                                                                }
                                                                value={
                                                                    quoteCurrency !=
                                                                    null
                                                                        ? quoteCurrency
                                                                        : ""
                                                                }
                                                            >
                                                                {currencies}
                                                            </select>
                                                        </div>
                                                    </li>

                                                    <li className="col-xs-12 col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                <FormatMessage path="outputLanguage">
                                                                    Output
                                                                    Language
                                                                </FormatMessage>
                                                                <Tooltip
                                                                    title={
                                                                        outputLanguageToolTip
                                                                    }
                                                                    bsClass="black"
                                                                >
                                                                    <div className="account-tool-tip">
                                                                        <i className="fal fa-question-circle" />
                                                                    </div>
                                                                </Tooltip>
                                                            </label>
                                                            <select
                                                                ref="culture"
                                                                disabled={
                                                                    disabled
                                                                }
                                                                className="form-control"
                                                                onChange={
                                                                    this
                                                                        .handleQuoteChange
                                                                }
                                                                value={
                                                                    quoteCulture
                                                                }
                                                            >
                                                                {cultures}
                                                            </select>
                                                        </div>
                                                    </li>
                                                    {/* Govt Funded */}
                                                    {requireGovFunded && (
                                                        <li className="col-xs-12">
                                                            <GovernmentRequirementsField
                                                                governmentFundedAnswer={
                                                                    this.state
                                                                        .governmentFundedAnswer
                                                                }
                                                                handleGovernmentFundedChange={
                                                                    this
                                                                        .handleGovernmentFundedChange
                                                                }
                                                                isExternal={
                                                                    this.props
                                                                        .appData
                                                                        .currentUser
                                                                        .Profile
                                                                        .External
                                                                }
                                                            />
                                                        </li>
                                                    )}
                                                    {incoTermsControl}
                                                    <li className="col-xs-12 col-sm-6">
                                                        {function(
                                                            external,
                                                            opportunityNo
                                                        ) {
                                                            if (
                                                                !external &&
                                                                opportunityNo
                                                            ) {
                                                                return (
                                                                    <div className="form-group">
                                                                        <label>
                                                                            <FormatMessage path="opportunity">
                                                                                Opportunity
                                                                            </FormatMessage>
                                                                        </label>
                                                                        <p>
                                                                            {
                                                                                quote.OpportunityNo
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                );
                                                            }
                                                        }.bind(this)(
                                                            external,
                                                            quote.OpportunityNo
                                                        )}
                                                    </li>
                                                </ul>
                                            </React.Fragment>
                                        )}
                                        {!hideEquipmentOwnerSection &&
                                            quote.HasEquipment && (
                                                <InputForm
                                                    title="Equipment Owner"
                                                    tooltipTitle={
                                                        equipmentOwnerFormInstruction
                                                    }
                                                    formGroupArr={
                                                        equipOwnerForms
                                                    }
                                                    handleChangeValue={
                                                        this
                                                            .handleChangeEquipmentOwner
                                                    }
                                                    handleWillAdviseChange={
                                                        this
                                                            .handleWillAdviseChange
                                                    }
                                                    checkWillAdvise={
                                                        quote.EquipmentOwner
                                                            ?.CompanyName ===
                                                        "Will Advise"
                                                    }
                                                    disableForm={
                                                        priorOrderExists
                                                    }
                                                />
                                            )}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container">
                            <SectionHeader
                                headerTitle=""
                                renderAsFooter
                                customStyle={{
                                    marginRight: 15,
                                    marginLeft: 15
                                }}
                            >
                                <SaveNewQuoteButton
                                    data={this.props.data}
                                    history={this.props.history}
                                    disabled={disableSave}
                                />
                            </SectionHeader>
                        </div>
                    </section>
                </div>
            );
        }
    }
}

//  react-redux connect
export default connect(null, {
    showUserSearchModal,
    showCustomerSearchModal,
    updateCurrentQuote,
    showChangeCustomerModal,
    saveQuote
})(QuoteEditView);

const GovtFundedSelection = props => {
    let warningMessage;
    if (props.showWarnings) {
        let govtRequiredYesWarning = msgFormatter(
            props.external
                ? "governmentRequirementsYesWarningExternal"
                : "governmentRequirementsYesWarning"
        )();

        if (props.showYesWarning) {
            warningMessage = (
                <span
                    style={{
                        color: "red"
                    }}
                >
                    {govtRequiredYesWarning}
                </span>
            );
        }
        if (props.showNoWarning) {
            warningMessage = (
                <span
                    style={{
                        color: "red"
                    }}
                >
                    {msgFormatter("governmentRequirementsNoWarning")()}
                </span>
            );
        }
    }

    return (
        <li className="col-xs-12 col-sm-6">
            <div className="form-group">
                <label>
                    <FormatMessage path="governmentRequirements">
                        Government Requirements
                    </FormatMessage>
                </label>
                {msgFormatter("governmentRequirementsDetails")()}
                <div className="radio-mandatory-container">
                    <div className="radio-group">
                        <input
                            type="radio"
                            name="govFunded"
                            value="true"
                            checked={props.checkedYes}
                            onChange={props.handleChange}
                            readOnly={props.readOnly}
                            disabled={props.disabledYes}
                        />
                        <label htmlFor="govFundedYes">
                            {msgFormatter("yes")()}
                        </label>
                    </div>
                    <div className="radio-group">
                        <input
                            type="radio"
                            name="govFunded"
                            value="false"
                            checked={props.checkedNo}
                            onChange={props.handleChange}
                            readOnly={props.readOnly}
                            disabled={props.disabledNo}
                        />
                        <label htmlFor="govFundedNo">
                            {msgFormatter("no")()}
                        </label>
                    </div>
                </div>
                {warningMessage}
            </div>
        </li>
    );
};
