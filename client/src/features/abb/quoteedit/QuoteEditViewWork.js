import React, { useContext, useEffect, useRef, useState } from "react";
import { FormatMessage } from "react-globalize";
//  Redux imports
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";

import {
    showCustomerSearchModal,
    showUserSearchModal
} from "actions/CustomerActions";
import { showChangeCustomerModal } from "actions/InteractionActions";
import { saveQuote, updateCurrentQuote } from "actions/QuoteActions";
import { PermissionContext } from "app/contexts/PermissionContext";
import Lessonly from "app/lessonlyIntg";
import { msgFormatter } from "app/util";
import InputForm from "components/generic/InputForm";
import Tooltip from "components/modals/Tooltip";
import FormInput from "components/util/FormInput";
var Globalize = require("globalize");
import clone from "lodash/clone";
import find from "lodash/find";
import matches from "lodash/matches";
import GovernmentRequirementsField from "wwwroot/components/util/GovernmentRequirementsField";
require("imports-loader?$=jquery!bootstrap-datepicker");

const QuoteEditView = props => {
    const context = useContext(PermissionContext);

    const [quote, setQuote] = useState(clone(props.data.currentQuote));
    const [changed, setChanged] = useState(false);
    const [originalIncoTerm] = useState(props.data.currentQuote.IncoTerm);
    const [originalIncoTermDescription] = useState(
        props.data.currentQuote.IncoTermDescription
    );
    const [governmentFundedAnswer, setGovernmentFundedAnswer] = useState(null);

    // helpers for missing methods that might exist elsewhere
    const isReadOnly = () => {
        if (props.isReadOnly) return props.isReadOnly();
        if (
            props.data &&
            props.data.currentQuote &&
            props.data.currentQuote.ReadOnly !== undefined
        )
            return props.data.currentQuote.ReadOnly;
        return false;
    };

    const newQuote = !!props.newQuote;

    useEffect(() => {
        Lessonly.setKeywords(["addEditQuote"]);
        if (quoteNameRef.current) {
            const str = quoteNameRef.current.value;
            quoteNameRef.current.focus();
            try {
                quoteNameRef.current.setSelectionRange(str.length, str.length);
            } catch {
                // some inputs may not support setSelectionRange
            }
        }

    }, []);

    useEffect(() => {
        setQuote(clone(props.data.currentQuote));
        setChanged(hasChanged(props.data.currentQuote));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data.currentQuote]);

    function getOrg(orgId) {
        return find(
            props.appData.filters.organizations,
            { OrgID: orgId },
            this
        );
    }

    const handleCheckbox = () => {
        setQuote(prevQuote => {
            const newQuoteObj = {
                ...prevQuote,
                PackagingProgressBilling:
                    prevQuote.PackagingProgressBilling === false
            };
            props.updateCurrentQuote(newQuoteObj);
            return newQuoteObj;
        });
        setChanged(true);
    };

    const handleOrgChange = (e) => {
        const q = clone(quote);
        const orgID = q.OrgID;
        q.OrgID = orgIDRef.current ? orgIDRef.current.value : q.OrgID;
        if (q.OrgID !== orgID) {
            const org = getOrg(q.OrgID);

            const terr = find(org.Territories, {
                TerritoryID: q.TerritoryID
            });
            if (!terr) {
                q.TerritoryID =
                    org && org.Territories && org.Territories.length > 0
                        ? org.Territories[0].TerritoryID
                        : "";
            }
        }

        setQuote(q);
        setChanged(true);
        props.updateCurrentQuote(q);
    };

    const handleQuoteChange = (e) => {
        if (!isReadOnly()) {
            const q = clone(quote);
            q.QuoteName = quoteNameRef.current
                ? quoteNameRef.current.value
                : q.QuoteName;
            q.DueDate = dueDateRef.current
                ? dueDateRef.current.value()
                : q.DueDate;
            q.SubmitDate = submitDateRef.current
                ? submitDateRef.current.value()
                : q.SubmitDate;
            q.OrgID = orgIDRef.current ? orgIDRef.current.value : q.OrgID;
            q.TerritoryID = territoryIDRef.current
                ? territoryIDRef.current.value
                : q.TerritoryID;
            q.ChannelType = channelTypeRef.current
                ? channelTypeRef.current.value
                : q.ChannelType;
            q.Description = descriptionRef.current
                ? descriptionRef.current.value
                : q.Description;
            q.CurrencyCode = currencyRef.current
                ? currencyRef.current.value
                : q.CurrencyCode;
            q.CultureCode = cultureRef.current
                ? cultureRef.current.value
                : q.CultureCode;
            q.PONumber =
                poNumberRef.current &&
                    poNumberRef.current.value !== null &&
                    poNumberRef.current.value !== ""
                    ? poNumberRef.current.value
                    : null;
            q.POValue = poValueRef.current ? poValueRef.current.value() : 0;
            setQuote(q);
            setChanged(true);
            props.updateCurrentQuote(q);
        }
    };

    const handleIncoTermChange = e => {
        if (!isReadOnly()) {
            const q = clone(quote);

            q.IncoTerm = e.target.value.split(" - ")[0];
            q.IncoTermDescription = e.target.value.split(" - ")[1];

            setQuote(q);
            setChanged(true);
            props.updateCurrentQuote(q);
        }
    };

    const hasChanged = (q) => {
        const matcher = matches(props.data.currentQuoteBaseline);
        const rtn = matcher(q);
        return !rtn;
    };

    const handleChangeEquipmentOwner = (e, id) => {
        const updated = {
            ...quote,
            EquipmentOwner: {
                ...quote.EquipmentOwner,
                [id]: e.target.value
            }
        };
        setQuote(updated);
        props.updateCurrentQuote(updated);
    };

    const handleWillAdviseChange = willAdvise => {
        const newValue = willAdvise ? "Will Advise" : "";
        const updated = {
            ...quote,
            EquipmentOwner: {
                City: newValue,
                CompanyName: newValue,
                PhoneNumber: newValue,
                State: newValue,
                StreetAddress: newValue,
                ZipCode: newValue
            }
        };
        setQuote(updated);
        props.updateCurrentQuote(updated);
    };

    const handleGovernmentFundedChange = val => {
        const gAnswer = val;
        const updated = {
            ...quote,
            GovernmentFundedAnswer: gAnswer
        };
        setQuote(updated);
        setChanged(true);
        setGovernmentFundedAnswer(gAnswer);
        props.updateCurrentQuote(updated);
    };

    // render logic (kept mostly unchanged)
    const q = quote;
    const equipmentOwnerFormInstruction = msgFormatter(
        "equipmentOwnerFormInstruction"
    )();
    const equipmentOwner = q.EquipmentOwner;
    const priorOrderExists =
        (q.PackagingProject && q.Orders?.length > 0) ||
        q.Orders?.filter(o => o.SAPSalesOrderEquip !== null).length > 0;

    const missingAllEntries =
        !equipmentOwner ||
        ((!equipmentOwner.CompanyName ||
            equipmentOwner.CompanyName.trim() === "") &&
            (!equipmentOwner.StreetAddress ||
                equipmentOwner.StreetAddress.trim() === "") &&
            (!equipmentOwner.City || equipmentOwner.City.trim() === "") &&
            (!equipmentOwner.State || equipmentOwner.State.trim() === "") &&
            (!equipmentOwner.ZipCode || equipmentOwner.ZipCode.trim() === "") &&
            (!equipmentOwner.PhoneNumber ||
                equipmentOwner.PhoneNumber.trim() === ""));
    const hideEquipmentOwnerSection =
        !q.EquipmentOwnerEnabled ||
        (q.HasEquipment && priorOrderExists && missingAllEntries);
    let equipOwnerForms = [];
    if (!hideEquipmentOwnerSection && q.HasEquipment) {
        equipOwnerForms = [];
    }

    if (
        q.CustomerID == null &&
        !props.appData.currentUser.Profile.Internal &&
        props.appData.currentUser.Accounts
    ) {
        const accounts = clone(props.appData.currentUser.Accounts);

        if (accounts.length == 1) {
            var account = accounts[0];
            q.CustomerID = account.CustomerID;
            q.CustomerName = account.Name;
            q.CustomerDisplayName = account.DisplayName;
            q.SalesForceID = account.SalesForceID;
            q.SapID = account.SapID;
            q.CurrencyCode = account.Currency;

            //there is a slight chance that an sapcustomer does not have a
            //sales territory defined, most likely direct or internal
            if (account.TerritoryID) {
                q.TerritoryID = account.TerritoryID;
                q.OrgID = account.OrgID;
            } else {
                q.TerritoryID = props.appData.currentUser.TerritoryID;
                q.OrgID = props.appData.currentUser.OrgID;
            }
        }
        if (accounts.length > 0) {
            var account = accounts[0];

            q.TerritoryID = props.appData.currentUser.TerritoryID
                ? props.appData.currentUser.TerritoryID
                : account.TerritoryID;
            q.OrgID = props.appData.currentUser.OrgID
                ? props.appData.currentUser.OrgID
                : account.OrgID;
        }
    }

    // determine the org and territory (check quote and fallback to settings for current user)
    const orgId = q.OrgID ? q.OrgID : props.appData.currentUser.OrgID;
    const org = getOrg(orgId);
    const terrs = org && org.Territories ? org.Territories : [];

    // set up the state of the quote (editable or not)
    const disabled = !!isReadOnly();
    const external = !props.appData.currentUser.Profile.Internal;
    const userHasCost = context.isInRole("Cost");

    // create a map of the orgs, territories, cultures, and currencies for the selects
    const orgs =
        !org && q.Organization ? (
            <option key={q.Organization.OrgID} value={q.Organization.OrgID}>
                {q.Organization.Description}
            </option>
        ) : (
            props.appData.filters.organizations.map((org) => {
                return (
                    <option key={org.OrgID} value={org.OrgID}>
                        {org.Description}
                    </option>
                );
            })
        );

    const territories =
        terrs.length === 0 && q.Territory ? (
            <option
                key={q.Territory.TerritoryID}
                value={q.Territory.TerritoryID}
            >
                {q.Territory.Description}
            </option>
        ) : (
            terrs.map((terr) => {
                return (
                    <option key={terr.TerritoryID} value={terr.TerritoryID}>
                        {terr.Description}
                    </option>
                );
            })
        );

    let incoTermsControl = null;
    let incoTermsOptions = null;
    if (!external) {
        let incoTerms = msgFormatter("noTermsListed");
        if (q.IncoTerm && q.IncoTerm !== "") {
            incoTerms = `${q.IncoTerm} - ${q.IncoTermDescription}`;
        }

        if (disabled || !userHasCost || q.StatusID === 4) {
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
            incoTermsOptions = props.appData.filters.incoTerms.map(item => {
                return (
                    <option key={item.Key} value={item.Key}>
                        {item.Key}
                        {' '}
                        (
                        {item.Name}
                        )
                    </option>
                );
            });
            if (
                q.IncoTerm &&
                q.IncoTerm !== null &&
                q.IncoTermDescription &&
                q.IncoTermDescription !== null
            ) {
                const item = find(props.appData.filters.incoTerms, {
                    IncoTermDescription: q.IncoTermDescription,
                    IncoTermID: q.IncoTerm
                });
                if (!item) {
                    incoTermsOptions.unshift(
                        <option
                            key={`${q.IncoTerm} - ${q.IncoTermDescription}`}
                            value={`${q.IncoTerm} - ${q.IncoTermDescription}`}
                        >
                            {`${q.IncoTerm} - ${q.IncoTermDescription}`}
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
                            ref={incoTermsRef}
                            className="form-control"
                            value={incoTerms}
                            onChange={handleIncoTermChange}
                        >
                            {incoTermsOptions}
                        </select>
                    </div>
                </li>
            );
        }
    }

    let poNumberInput;
    let poValueInput;
    if (!props.appData.currentUser.Profile.EndUser) {
        poNumberInput = (
            <li className="col-xs-12 col-sm-6">
                {/* <PONumber>poNumber</PONumber> */}
            </li>
        );
        poValueInput = (
            <li className="col-xs-12 col-sm-6">
                {/* <POValue>poValue</POValue> */}
            </li>
        );
    }

    let endCustomerVal;
    if (q.EndCustomerSapID) {
        endCustomerVal = `${q.EndCustomerSapID}, ${q.EndCustomerName}`;
    }

    // Government Funding
    let disableSave = false;
    const requireGovFunded = props.appData.configuration.RequireGovFundedAnswer;

    if (requireGovFunded && newQuote && (
        governmentFundedAnswer === "yes" ||
        governmentFundedAnswer === null
    )) {
        disableSave = true;
    }

    return (
        <div>
            <Prompt message={() => prmpt} when={changed} />
            <section>
                <div className="container">
                    {/* <SaveButtons></SaveButtons> */}
                    <div className="col-xs-12 col-md-6">
                        <form className="add-new-quote-form">
                            <div className="add-new-quote-form-wrapper">
                                <ul className="row config-row">
                                    <li className="col-xs-12">
                                        {/* <QuoteName></QuoteName> */}
                                    </li>
                                    <li className="col-xs-12 col-sm-6">
                                        {/* <DueDate></DueDate> */}
                                    </li>
                                    <li className="col-xs-12 col-sm-6">
                                        {/* <SubmitDate></SubmitDate> */}
                                    </li>
                                    <li className="col-xs-12">
                                        {/* <Description></Description> */}
                                    </li>
                                    <li className="col-xs-12">
                                        {/* <ProgressBilling></ProgressBilling> */}
                                    </li>

                                    <li className="col-xs-12 col-sm-6">
                                        {/* <SalesOrganization></SalesOrganization> */}
                                    </li>
                                    <li className="col-xs-12 col-sm-6">
                                        {/* <Territory></Territory> */}
                                    </li>
                                    <li className="col-xs-12 col-sm-6">
                                        {/* <ChannelType></ChannelType> */}
                                    </li>
                                    <li className="col-xs-12 col-sm-6">
                                        {/* <Currency></Currency> */}
                                    </li>
                                    <li className="col-xs-12 col-sm-6">
                                        {/* <OutputLanguage></OutputLanguage> aka cultures */}
                                    </li>
                                    {/* Govt Funded */}
                                    {requireGovFunded ? (
                                        <li className="col-xs-12">
                                            <GovernmentRequirementsField
                                                hideWarning
                                                readOnly
                                                isExternal={
                                                    props.appData.currentUser
                                                        .Profile.External
                                                }
                                                domesticPreference={
                                                    props.data.currentQuote
                                                        .DomesticPreference
                                                }
                                                dpoDisabled={
                                                    props.data.currentQuote
                                                        .GovernmentFundedAnswer !==
                                                    "dpo"
                                                }
                                                governmentFundedAnswer={
                                                    props.data.currentQuote
                                                        .GovernmentFunded
                                                        ? "yes"
                                                        : (props.data
                                                            .currentQuote
                                                            .DomesticPreference
                                                            ? "dpo"
                                                            : "no")
                                                }
                                                govFundedNoDisabled={
                                                    props.data.currentQuote
                                                        .GovernmentFundedAnswer !==
                                                    "no"
                                                }
                                                govFundedYesDisabled={
                                                    props.data.currentQuote
                                                        .GovernmentFundedAnswer !==
                                                    "yes"
                                                }
                                            />
                                        </li>
                                    ) : null}
                                    <li className="col-xs-12 col-sm-6">
                                        {/* <OpportunityLabel></OpportunityLabel> */}
                                    </li>
                                </ul>
                                <ul className="row config-row">
                                    {/* <StatusSection></StatusSection> */}
                                </ul>
                            </div>
                        </form>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <form className="add-new-quote-form">
                            <div className="add-new-quote-form-wrapper">
                                {/* <SectionTitle>Account Details</SectionTitle> */}
                                <ul className="row config-row">
                                    <li>
                                        <div className="form-group">
                                            {/* <SoldTo></SoldTo> */}
                                            {/* path=soldToAccount
                                                    tooltip=accountToolTip   
                                                    value=CustomerDisplayName                                                    <FormatMessage path="soldToAccount">
                                                */}
                                        </div>
                                    </li>
                                    <li className="col-xs-12 col-sm-6">
                                        {/* <SoldToLabel></SoldToLabel> */}
                                    </li>
                                </ul>
                                <ul className="row config-row">
                                    {/* <EndUser></EndUser> */}
                                    {/* <EndUserLabel></EndUserLabel> */}
                                </ul>
                                {/* <SectionTitle>PO Details</SectionTitle> */}
                                <ul className="row config-row">
                                    {/* <PONumber></PONumber> */}
                                    {/* <POValue></POValue> */}
                                    {/* <IncoTerms></IncoTerms> */}
                                </ul>
                                {!hideEquipmentOwnerSection &&
                                    q.HasEquipment ? (
                                    <InputForm
                                        checkWillAdvise={
                                            q.EquipmentOwner
                                                ?.CompanyName ===
                                            "Will Advise"
                                        }
                                        handleChangeValue={
                                            handleChangeEquipmentOwner
                                        }
                                        handleWillAdviseChange={
                                            handleWillAdviseChange
                                        }
                                        title="Equipment Owner"
                                        disableForm={priorOrderExists}
                                        formGroupArr={equipOwnerForms}
                                        tooltipTitle={
                                            equipmentOwnerFormInstruction
                                        }
                                    />
                                ) : null}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container">
                    {/* <SaveButtons></SaveButtons> */}
                </div>
            </section>
        </div>
    );
};

//  react-redux connect
export default connect(null, {
    saveQuote,
    showChangeCustomerModal,
    showCustomerSearchModal,
    showUserSearchModal,
    updateCurrentQuote
})(QuoteEditView);
