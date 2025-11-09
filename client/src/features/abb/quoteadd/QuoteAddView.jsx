import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';

import Lessonly from 'app/lessonlyIntg';
import { msgFormatter } from 'app/util';
import {
  ContentSection,
  SubSection,
  SubSectionContent,
} from 'empower-components/ContentSection';
import styled from 'styled-components';
import {
  ChannelType,
  Currency,
  Description,
  EndUser,
  GovernmentRequirements,
  Incoterm,
  OpportunityLabel,
  OutputLanguage,
  ProgressBilling,
  QuoteName,
  SalesOrganization,
  SoldTo,
  SubmitDate,
  Territory,
} from '../common/form';
import ViewSubHeader from '../common/viewSubHeader/ViewSubHeader';
import useQuote from '../quoteedit/useQuote';
import ViewMenu from './menu/ViewMenu';

const QuoteAddView = ({ history, requireGovFundedAnswer, state }) => {
  const [formValues, setFormValues] = useState({});
  const [changed, setChanged] = useState(false);
  const { getFormValues, mapFormToQuote } = useQuote();

  console.log('formValues', formValues);

  // TO DO
  const newQuote = true;
  const disabled = false;
  const sapCustomer = false;
  const external = false;

  useEffect(() => {
    Lessonly.setKeywords(['addQuote']);
  }, []);

  useEffect(() => {
    setFormValues(getFormValues(quote, user));
    setChanged(false);
  }, [quote]);

  const handleGenericChange = (field, value) => {
    console.log('handleGenericChange', field, value);
    setFormValues((prev) => ({
      ...prev,
      [field]: value || '',
    }));
    setChanged(true);
    updateCurrentQuote(mapFormToQuote(formValues, quote));
  };

  return (
    <>
      {/* Page Title */}
      <ContentSection>
        <ViewSubHeader
          rightDiv={<ViewMenu />}
          title={msgFormatter('addNewQuote')()}
        />
      </ContentSection>
      <ContentSection>
        <Prompt
          //  when={state.changed}
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
                <DueDate
                  disabled={disabled}
                  value={formValues.DueDate}
                  onChange={(value) => handleGenericChange('DueDate', value)}
                />
              </FormGroup>
              <FormGroup className="col-xs-12 col-sm-6">
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
                  onChange={(value) =>
                    handleGenericChange('description', value)
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
            </div>
            <div className="col-xs-12 col-md-6 col">
              <FormGroup>
                <SoldTo
                  required
                  disabled={disabled || quote.StatusID >= 4}
                  inputText={formValues.orgId}
                  onChange={(value) => handleGenericChange('orgId', value)}
                />
              </FormGroup>
              <div className="col-xs-12">
                <FormGroup className="col-xs-6 col">
                  <EndUser
                    disabled={false}
                    onChange={(value) => handleGenericChange('EndUser', value)}
                  />
                </FormGroup>
              </div>
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
  requireGovFundedAnswer: state.App.configuration?.RequireGovFundedAnswer,
  state,
  user: state.App.currentUser,
});

export default connect(mapStateToProps, {})(QuoteAddView);

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
