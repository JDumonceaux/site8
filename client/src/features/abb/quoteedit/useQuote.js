import { msgFormatter } from "app/util";
const Globalize = require("globalize");
import cloneDeep from "lodash/cloneDeep";

const useQuote = () => {
    // Adds additional values to quote
    const getExtendedQuote = (quote, user) => {
        if (!quote) return {};

        const clone = cloneDeep(quote);

        const fmtr = Globalize("en").dateFormatter();
        const totalQuoteValue = Number.isNaN(quote.QuoteValueGE)
            ? 0
            : quote.QuoteValueGE;
        const poValue = Number.isNaN(quote.POValue) ? 0 : quote.POValue;
        const minPOValue = totalQuoteValue * 0.95;
        const maxPOValue = totalQuoteValue * 1.05;

        const returnValue = {
            ...clone,
            cultureCode: quote.CultureCode ?? user.CultureCode,
            currencyCode: quote.CurrencyCode ?? user.CurrencyCode,
            description:
                quote.Description === null || quote.Description === undefined
                    ? ""
                    : quote.Description,
            dueDate: quote.DueDate ? fmtr(new Date(quote.DueDate)) : "",
            isPOInvalid:
                poValue > 0
                    ? poValue < minPOValue || poValue > maxPOValue
                    : false,
            isReadOnly:
                !quote ||
                quote.UserAuth ||
                quote.StatusID === 2 ||
                quote.StatusID > 4,
            isUserSearchDisabled:
                quote.UserAuth || quote.StatusID === 2 || quote.StatusID > 4,
            maxPOValue,
            minPOValue,
            orgId: quote.OrgID ?? user.OrgID,
            poNumber: quote.PONumber === null ? "" : quote.PONumber,
            poValue,
            quoteName: quote.QuoteName === null ? "" : quote.QuoteName,
            //most customers will have an SapID, only SFDC Quotes *could* only have a DUNS
            //if SAP customer we will lock Org, territory, Currency based on Account
            sapCustomer: !(quote.SapID === null || quote.SapID === undefined),
            status: msgFormatter(`server/status/short/${quote.StatusID}`)(),
            submitDate: quote.SubmitDate
                ? fmtr(new Date(quote.SubmitDate))
                : "",
            territoryId: quote.TerritoryID ?? user.TerritoryID,
            totalQuoteValue
        };

        return returnValue;
    };

    const getFormValues = (quote, user) => {
        if (!quote) return {};

        const fmtr = Globalize("en").dateFormatter();
        const totalQuoteValue = Number.isNaN(quote.QuoteValueGE)
            ? 0
            : quote.QuoteValueGE;
        const poValue = Number.isNaN(quote.POValue) ? 0 : quote.POValue;
        const minPOValue = totalQuoteValue * 0.95;
        const maxPOValue = totalQuoteValue * 1.05;

        const clone = cloneDeep(quote);

        const returnValue = {
            ...clone,
            cultureCode: quote.CultureCode ?? user.CultureCode,
            currencyCode: quote.CurrencyCode ?? user.CurrencyCode,
            description:
                quote.Description === null || quote.Description === undefined
                    ? ""
                    : quote.Description,
            dueDate: quote.DueDate ? fmtr(new Date(quote.DueDate)) : "",
            isPOInvalid:
                poValue > 0
                    ? poValue < minPOValue || poValue > maxPOValue
                    : false,
            maxPOValue,
            minPOValue,
            orgId: quote.OrgID ?? user.OrgID,
            poNumber: quote.PONumber === null ? "" : quote.PONumber,
            poValue,
            quoteName: quote.QuoteName === null ? "" : quote.QuoteName,
            //most customers will have an SapID, only SFDC Quotes *could* only have a DUNS
            //if SAP customer we will lock Org, territory, Currency based on Account
            sapCustomer: !(quote.SapID === null || quote.SapID === undefined),
            status: msgFormatter(`server/status/short/${quote.StatusID}`)(),
            submitDate: quote.SubmitDate
                ? fmtr(new Date(quote.SubmitDate))
                : "",
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
        getFormValues,
        mapFormToQuote
    };
};

export default useQuote;
