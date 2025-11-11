import { msgFormatter } from "app/util";
const Globalize = require("globalize");
import cloneDeep from "lodash/cloneDeep";

// Helper utilities extracted to reduce complexity inside functions
const formatDate = (date) => {
    if (!date) return "";
    const fmtr = Globalize("en").dateFormatter();
    return fmtr(new Date(date));
};

const safeString = (value) =>
    value === null || value === undefined ? "" : value;

const safeNumber = (value) => (Number.isNaN(value) ? 0 : value);

const computePOBounds = (total) => ({
    max: total * 1.05,
    min: total * 0.95
});

const isSapCustomer = (quote) => !(quote.SapID === null || quote.SapID === undefined);

const formatStatus = (statusID) => msgFormatter(`server/status/short/${statusID}`)();

const isSearchOrReadOnly = (quote) => quote.UserAuth || quote.StatusID === 2 || quote.StatusID > 4;

// Adds additional values to quote (moved to outer scope and simplified)
const getExtendedQuote = (quote, user) => {
    if (!quote) return {};

    const clone = cloneDeep(quote);

    const totalQuoteValue = safeNumber(quote.QuoteValueGE);
    const poValue = safeNumber(quote.POValue);
    const { max: maxPOValue, min: minPOValue } = computePOBounds(totalQuoteValue);

    const returnValue = {
        ...clone,
        cultureCode: quote.CultureCode ?? user.CultureCode,
        currencyCode: quote.CurrencyCode ?? user.CurrencyCode,
        description: safeString(quote.Description),
        dueDate: formatDate(quote.DueDate),
        isPOInvalid: poValue > 0 ? poValue < minPOValue || poValue > maxPOValue : false,
        isReadOnly: !quote || isSearchOrReadOnly(quote),
        isUserSearchDisabled: isSearchOrReadOnly(quote),
        maxPOValue,
        minPOValue,
        orgId: quote.OrgID ?? user.OrgID,
        poNumber: quote.PONumber === null ? "" : quote.PONumber,
        poValue,
        quoteName: quote.QuoteName === null ? "" : quote.QuoteName,
        //most customers will have an SapID, only SFDC Quotes *could* only have a DUNS
        //if SAP customer we will lock Org, territory, Currency based on Account
        sapCustomer: isSapCustomer(quote),
        status: formatStatus(quote.StatusID),
        submitDate: formatDate(quote.SubmitDate),
        territoryId: quote.TerritoryID ?? user.TerritoryID,
        totalQuoteValue
    };

    return returnValue;
};

const useQuote = () => {
    const getFormValues = (quote, user) => {
        if (!quote) return {};

        const totalQuoteValue = safeNumber(quote.QuoteValueGE);
        const poValue = safeNumber(quote.POValue);
        const { max: maxPOValue, min: minPOValue } = computePOBounds(totalQuoteValue);

        const clone = cloneDeep(quote);

        const returnValue = {
            ...clone,
            cultureCode: quote.CultureCode ?? user.CultureCode,
            currencyCode: quote.CurrencyCode ?? user.CurrencyCode,
            description: safeString(quote.Description),
            dueDate: formatDate(quote.DueDate),
            isPOInvalid: poValue > 0 ? poValue < minPOValue || poValue > maxPOValue : false,
            maxPOValue,
            minPOValue,
            orgId: quote.OrgID ?? user.OrgID,
            poNumber: quote.PONumber === null ? "" : quote.PONumber,
            poValue,
            quoteName: quote.QuoteName === null ? "" : quote.QuoteName,
            //most customers will have an SapID, only SFDC Quotes *could* only have a DUNS
            //if SAP customer we will lock Org, territory, Currency based on Account
            sapCustomer: isSapCustomer(quote),
            status: formatStatus(quote.StatusID),
            submitDate: formatDate(quote.SubmitDate),
            territoryId: quote.TerritoryID ?? user.TerritoryID,
            totalQuoteValue
        };

        return returnValue;
    };

    const mapFormToQuote = (form, quote) => {
        const endUser =
            form?.endUser?.length > 0
                ? {
                    endCustomerManager: "",
                    endCustomerName: "",
                    endCustomerSapID: ""
                }
                : {
                    endCustomerManager: null,
                    endCustomerName: null,
                    endCustomerSapID: null
                };
        const returnValue = {
            ...quote,
            ChannelType: form.channelType,
            CultureCode: form.culture,
            CurrencyCode: form.currency,
            Description: form.description,
            DueDate:
                form.dueDate && form.dueDate.length > 0 ? form.dueDate : null,
            EndCustomerManager: endUser.endCustomerManager,
            EndCustomerName: endUser.endCustomerName,
            EndCustomerSapID: endUser.endCustomerSapID,
            OrgID: form.orgID,
            PONumber:
                form.poNumber && form.poNumber !== null && form.poNumber !== ""
                    ? form.poNumber
                    : null,
            POValue: form.poValue ?? 0,
            QuoteName: form.quoteName,
            SubmitDate:
                form.submitDate && form.submitDate.length > 0
                    ? form.submitDate
                    : null,
            TerritoryID: form.territoryID
        };

        return returnValue;
    };

    return {
        getExtendedQuote,
        getFormValues,
        mapFormToQuote
    };
};

export default useQuote;
