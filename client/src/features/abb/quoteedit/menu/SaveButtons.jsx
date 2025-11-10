import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { showConfirmModal } from 'actions/InteractionActions';
import { clearQuoteSaveAction, saveQuote } from 'actions/QuoteActions';
import { msgFormatter } from 'app/util';
import Button from 'empower-components/Button';
import styled from 'styled-components';

const SaveButtons = ({
  clearQuoteSaveAction,
  disabled,
  history,
  quote,
  quoteSaveAction,
  saveQuote,
  showConfirmModal,
}) => {
  useEffect(() => {
    // Immediately clear the saveAction type from the store
    if (quoteSaveAction !== '') {
      clearQuoteSaveAction();
    }
  }, [quoteSaveAction]);

  const handleCancel = () => {
    history.goBack();
  };

  const handleSave = (error) => {
    if (disabled) {
      return;
    }

    if (quote) {
      const poValue = Number.isNaN(quote.POValue) ? 0 : quote.POValue;
      const totalQuoteValue = Number.isNaN(quote.QuoteValueGE)
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

      if (customerRequired || quoteNameRequired || poRequired || isPOInvalid) {
        const save = msgFormatter('save')();
        const quoteValidation = msgFormatter('quoteValidation')();
        showConfirmModal(true, save, quoteValidation);
      } else {
        saveQuote((quoteId) => {
          history.push(`/quotes/${quoteId}`);
        });
      }
    }
    error.stopPropagation();
  };

  if (quote) {
    if (quote.UserAuth || quote.StatusID === 2 || quote.StatusID > 4) {
      return null;
    }
    return (
      <ButtonsDiv>
        <Button
          handleSave={handleCancel}
          size="regular"
          title={msgFormatter('cancel')()}
          buttonType="secondary"
        />

        <Button
          disabled={disabled}
          handleSave={handleSave}
          size="regular"
          title={msgFormatter('save')()}
          buttonType="primary"
        />
      </ButtonsDiv>
    );
  }
  return null;
};

export default connect(null, {
  clearQuoteSaveAction,
  saveQuote,
  showConfirmModal,
})(SaveButtons);

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
`;
