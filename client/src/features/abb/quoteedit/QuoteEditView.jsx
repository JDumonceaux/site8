import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';

import { updateCurrentQuote } from 'actions/QuoteActions';
import Lessonly from 'app/lessonlyIntg';
import { msgFormatter } from 'app/util';
import { ContentSection, SubSection } from 'empower-components/ContentSection';
import styled from 'styled-components';
import {
  ChannelType,
  Currency,
  Description,
  DueDate,
  EndUser,
  EndUserLabel,
  GovernmentRequirements,
  Incoterm,
  OpportunityLabel,
  OutputLanguage,
  PONumber,
  POValue,
  ProgressBilling,
  QuoteName,
  SalesOrganization,
  SectionTitle,
  SoldTo,
  SoldToLabel,
  SubmitDate,
  Territory,
} from '../common/form';
import ViewSubHeader from '../common/viewSubHeader/ViewSubHeader';
import ViewMenu from './menu/ViewMenu';
import StatusSection from './StatusSection';
import useQuote from './useQuote';

const QuoteEditView = ({
  quote,
  requireGovFundedAnswer,
  updateCurrentQuote,
  user,
}) => {
  const [formValues, setFormValues] = useState({});
  const [changed, setChanged] = useState(false);
  const { getFormValues, mapFormToQuote } = useQuote();
  const isEdit = true;

  // if (!quote) {
  //     return <QuoteUnavailable />;
  // }

  console.log('quote', quote);
  console.log('formValues', formValues);
  console.log('formValues.quoteName', formValues.quoteName);

  // TO DO
  const newQuote = true;
  const disabled = false;
  const sapCustomer = false;
  const external = false;
  const poValueDisabled =
    disabled ||
    // (this.props.data.priceValidationData
    //     ? !this.props.data.priceValidationData.Valid
    //     : false) ||
    !quote.QuoteItems ||
    quote.QuoteItems.length === 0;
  const poValueValidationMessage = msgFormatter('validation/poValueOutOfRange')(
    5,
  );

  useEffect(() => {
    Lessonly.setKeywords(['editQuote']);
  }, []);

  useEffect(() => {
    setFormValues(getFormValues(quote, user));
    setChanged(false);
  }, [quote]);

  const handleGenericChange = (field, value) => {
    console.log('handleGenericChange', field, value);
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setChanged(true);
    // updateCurrentQuote(mapFormToQuote(formValues, quote));
  };

  return (
    <>
      {/* Page Title */}
      <ContentSection>
        <ViewSubHeader
          rightDiv={<ViewMenu />}
          title={msgFormatter('editQuote')()}
        />
      </ContentSection>
      <ContentSection>
        <Prompt
          // when={state.changed}
          message={() => msgFormatter('unsavedQuotePrompt')()}
        />
        <SubSection>
          <StyledForm>
            <div className="col-xs-12 col-md-6 col">
              {/* Quote Name */}
              <FormGroup>
                <QuoteName
                  disabled={disabled || quote.StatusID >= 4}
                  value={formValues.quoteName}
                  onChange={(value) => handleGenericChange('quoteName', value)}
                />
              </FormGroup>
              <FormGroup className="col-xs-12 col-sm-6 col">
                {/* TO DO: Add Clear */}
                <DueDate
                  disabled={disabled}
                  value={formValues.DueDate}
                  onChange={(value) => handleGenericChange('DueDate', value)}
                />
              </FormGroup>
              <FormGroup className="col-xs-12 col-sm-6">
                {/* TO DO: Add Clear */}
                <SubmitDate
                  disabled={disabled}
                  value={formValues.SubmitDate}
                  onChange={(value) => handleGenericChange('SubmitDate', value)}
                />
              </FormGroup>
              <FormGroup>
                <Description
                  disabled={disabled}
                  value={formValues.description}
                  onChange={(error) =>
                    handleGenericChange('description', error.target.value)
                  }
                />
              </FormGroup>
              <ProgressBilling
                margin
                disabled={
                  quote.PackagingProgressBillingEnabled ? null : !newQuote
                }
                checked={formValues.ProgressBilling}
                show={user.Profile.Internal}
              />
              <StatusSection quote={quote} />
            </div>
            <div className="col-xs-12 col-md-6 col">
              <SectionTitle>{msgFormatter('accountDetails')()}</SectionTitle>

              <SoldTo
                required
                disabled={disabled || quote.StatusID >= 4}
                inputText={formValues.orgId}
                onChange={(value) => handleGenericChange('orgId', value)}
              />
              <SoldToLabel
                margin
                value={formValues.CustomerManager}
              />

              <div className="col-xs-12">
                <div className="col-xs-6 col">
                  <EndUser
                    onChange={(value) => handleGenericChange('endUser', value)}
                    show={quote.isUserSearchDisabled}
                  />
                  <EndUserLabel
                    margin
                    value={formValues.EndCustomerManager}
                    show={!quote.isUserSearchDisabled}
                  />
                </div>
              </div>
              <SectionTitle>{msgFormatter('poDetails')()}</SectionTitle>
              <PONumber
                disabled={
                  poValueDisabled ||
                  quote.Orders?.length > 0 ||
                  quote.ManualOrders?.length > 0
                }
                value={formValues.poNumber}
                // onChange={val =>
                //     handleGenericChange("poNumber", val)
                // }
                show={!user.Profile.EndUser}
              />
              <POValue
                disabled={poValueDisabled}
                value={formValues.poValue}
                errorMessage={poValueValidationMessage}
                // onChange={val =>
                //     handleGenericChange("poValue", val)
                // }
                show={!user.Profile.EndUser}
              />
              <FormGroup className="col-xs-12 col-sm-6 col">
                <SalesOrganization
                  disabled={disabled || newQuote || sapCustomer || external}
                  value={formValues.OrgID}
                  onChange={(value) =>
                    handleGenericChange('SalesOrganization', value)
                  }
                />
              </FormGroup>
              <FormGroup className="col-xs-12 col-sm-6">
                <Territory
                  disabled={disabled || newQuote || sapCustomer || external}
                  value={formValues.territoryId}
                  onChange={(value) =>
                    handleGenericChange('territoryId', value)
                  }
                />
              </FormGroup>
              <FormGroup className="col-xs-12 col-sm-6 col">
                <ChannelType
                  disabled={disabled || newQuote || sapCustomer || external}
                  value={formValues.OrgID}
                  onChange={(value) =>
                    handleGenericChange('ChannelType', value)
                  }
                />
              </FormGroup>
              <FormGroup className="col-xs-12 col-sm-6">
                <Currency
                  disabled={disabled || newQuote || sapCustomer || external}
                  value={formValues.currencyCode}
                  onChange={(value) =>
                    handleGenericChange('currencyCode', value)
                  }
                />
              </FormGroup>
              <FormGroup className="col-xs-12 col-sm-6">
                <OutputLanguage
                  disabled={disabled}
                  value={formValues.cultureCode}
                  onChange={(value) =>
                    handleGenericChange('cultureCode', value)
                  }
                />
              </FormGroup>
              <FormGroup className="col-xs-12 ">
                <GovernmentRequirements
                  hideWarning
                  value={formValues.GovernmentRequirements}
                  onChange={(value) =>
                    handleGenericChange('GovernmentRequirements', value)
                  }
                  show={requireGovFundedAnswer}
                />
                <Incoterm
                  value={formValues.Incoterm}
                  onChange={(value) => handleGenericChange('Incoterm', value)}
                />
              </FormGroup>
              <OpportunityLabel
                margin
                value={formValues.OpportunityNo}
                show={external ? null : formValues.OpportunityNo}
              />
            </div>
          </StyledForm>
        </SubSection>
      </ContentSection>
    </>
  );
};

const mapStateToProps = (state) => ({
  quote: state.Quote.currentQuote,
  requireGovFundedAnswer: state.App.configuration?.RequireGovFundedAnswer,
  user: state.App.currentUser,
});

export default connect(mapStateToProps, { updateCurrentQuote })(QuoteEditView);

const StyledForm = styled.form`
  // Override the bootstrap padding on the columns
  .col-xs-12,
  .col-xs-6,
  .col-md-6 {
    padding-left: unset;
    padding-right: unset;
  }
  .col {
    padding-right: 30px;
  }
`;
const FormGroup = styled.div`
  margin-bottom: 20px;
`;
