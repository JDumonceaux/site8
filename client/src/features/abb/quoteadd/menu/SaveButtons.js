import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { msgFormatter } from "app/util";
import Button from "empower-components/Button";
import { connect } from "react-redux";
import { clearQuoteSaveAction, saveQuote } from "actions/QuoteActions";
import { showConfirmModal } from "actions/InteractionActions";

const SaveButtons = ({
    quote,
    quoteSaveAction,
    disabled,
    history,
    clearQuoteSaveAction,
    saveQuote,
    showConfirmModal
}) => {
    useEffect(() => {
        // Immediately clear the saveAction type from the store
        if (quoteSaveAction !== "") {
            clearQuoteSaveAction();
        }
    }, [quoteSaveAction]);

    const handleCancel = e => {
        history.goBack();
    };

    const handleSave = e => {
        if (disabled) {
            return;
        }

        if (quote) {
            const poValue = isNaN(quote.POValue) ? 0 : quote.POValue;
            const totalQuoteValue = isNaN(quote.QuoteValueGE)
                ? 0
                : quote.QuoteValueGE;
            const minPOValue = totalQuoteValue * 0.95;
            const maxPOValue = totalQuoteValue * 1.05;
            const isPricingValid = quote.priceValidationData
                ? quote.priceValidationData.Valid
                : true;
            const isPOInvalid = isPricingValid
                ? poValue > 0
                    ? poValue < minPOValue || poValue > maxPOValue
                    : false
                : false;

            const customerRequired = !quote.CustomerID || !quote.CustomerName;
            const quoteNameRequired = !quote.QuoteName;
            const poRequired =
                (!quote.PONumber && quote.POValue > 0) ||
                (quote.PONumber && quote.POValue === 0);

            if (
                customerRequired ||
                quoteNameRequired ||
                poRequired ||
                isPOInvalid
            ) {
                const save = msgFormatter("save")();
                const quoteValidation = msgFormatter("quoteValidation")();
                showConfirmModal(true, save, quoteValidation);
            } else {
                saveQuote(quoteId => {
                    history.push(`/quotes/${quoteId}`);
                });
            }
        }
        e.stopPropagation();
    };

    if (quote) {
        if (
            quote.UserAuth ||
            quote.StatusID === 2 ||
            quote.StatusID > 4
        ) {
            return null;
        } else {
            return (
                <ButtonsDiv>
                    <Button
                        buttonType="secondary"
                        size="regular"
                        title={msgFormatter("cancel")()}
                        handleSave={handleCancel}
                    />

                    <Button
                        buttonType="primary"
                        size="regular"
                        title={msgFormatter("save")()}
                        handleSave={handleSave}
                        disabled={disabled}
                    />
                </ButtonsDiv>
            );
        }
    } else {
        return null;
    }
};

export default connect(null, {
    clearQuoteSaveAction,
    saveQuote,
    showConfirmModal
})(SaveButtons);

const ButtonsDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    column-gap: 10px;
`;
