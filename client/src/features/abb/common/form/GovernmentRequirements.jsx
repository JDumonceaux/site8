import React, { memo, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import RadioButton from 'empower-components/RadioButton';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// governmentFunded = true, false, or null
// null is used to force a user selection.
const GovernmentRequirements = (props) => {
  const {
    domesticPreference,
    domesticPreferenceState,
    dpoDisabled,
    governmentFundedAnswer,
    governmentFundedState,
    govFundedNoDisabled,
    govFundedYesDisabled,
    // Optional
    hideWarning,
    // If provided, these props will override the corresponding state values
    isExternal,
    // State values from Redux
    isExternalState,
    isOrder,
    // Required
    onChange,
    show,
    value,
  } = props;

  if (!show) {
    return null;
  }

  const temporaryGFA = governmentFundedState
    ? 'yes'
    : domesticPreferenceState
      ? 'dpo'
      : 'no';
  // Use values if provided from props, otherwise fall back to state values
  const localValues = {
    domesticPreference: domesticPreference ?? domesticPreferenceState,
    dpoDisabled: dpoDisabled ?? temporaryGFA === 'dpo',
    governmentFundedAnswer: governmentFundedAnswer ?? value ?? temporaryGFA,
    govFundedNoDisabled: govFundedNoDisabled ?? temporaryGFA === 'no',
    govFundedYesDisabled: govFundedYesDisabled ?? temporaryGFA === 'yes',
    isExternal: isExternal ?? isExternalState,
  };

  const message = useMemo(() => {
    if (hideWarning) {
      return '';
    }
    switch (localValues.governmentFundedAnswer) {
      case 'dpo': {
        return msgFormatter('domesticPreferenceYes')();
      }
      case 'no': {
        if (isOrder) {
          return localValues.isExternal
            ? msgFormatter('governmentRequirementsOrderNoExternal')()
            : msgFormatter('governmentRequirementsOrderNo')();
        }
        return msgFormatter('governmentRequirementsNoWarning')();
      }
      case 'yes': {
        if (isOrder) {
          return localValues.isExternal
            ? ''
            : msgFormatter('governmentRequirementsOrderYes')();
        }
        return localValues.isExternal
          ? msgFormatter('governmentRequirementsYesWarningExternal')()
          : msgFormatter('governmentRequirementsYesWarning')();
      }
      default: {
        return '';
      }
    }
  }, [
    hideWarning,
    localValues.governmentFundedAnswer,
    isOrder,
    localValues.isExternal,
  ]);

  const handleYesChange = useCallback(() => onChange('yes'), [onChange]);
  const handleNoChange = useCallback(() => onChange('no'), [onChange]);
  const handleDpoChange = useCallback(() => onChange('dpo'), [onChange]);

  return (
    <Container>
      <Label>{msgFormatter('governmentRequirements')()}</Label>
      <Details>{msgFormatter('governmentRequirementsDetails')()}</Details>
      <RadioContainer>
        <RadioGroup>
          <RadioButton
            checked={localValues.governmentFundedAnswer === 'yes'}
            disabled={localValues.govFundedYesDisabled}
            handleSelect={handleYesChange}
            label={msgFormatter('yes')()}
          />
        </RadioGroup>
        <RadioGroup>
          <RadioButton
            checked={localValues.governmentFundedAnswer === 'no'}
            disabled={localValues.govFundedNoDisabled}
            handleSelect={handleNoChange}
            label={msgFormatter('no')()}
          />
        </RadioGroup>
        {(localValues.domesticPreference || localValues.isExternal) && (
          <RadioGroup>
            <RadioButton
              checked={localValues.governmentFundedAnswer === 'dpo'}
              disabled={localValues.dpoDisabled}
              handleSelect={handleDpoChange}
              label={msgFormatter('govFundedDpo')()}
            />
          </RadioGroup>
        )}
      </RadioContainer>
      {message && <WarningMessage>{message}</WarningMessage>}
    </Container>
  );
};

GovernmentRequirements.propTypes = {
  domesticPreference: PropTypes.bool,
  domesticPreferenceState: PropTypes.bool,
  dpoDisabled: PropTypes.bool,
  governmentFundedAnswer: PropTypes.string,
  governmentFundedState: PropTypes.bool,
  govFundedNoDisabled: PropTypes.bool,
  govFundedYesDisabled: PropTypes.bool,
  hideWarning: PropTypes.bool,
  isExternal: PropTypes.bool,
  isExternalState: PropTypes.bool,
  isOrder: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  show: PropTypes.bool,
  value: PropTypes.string,
};

GovernmentRequirements.displayName = 'GovernmentRequirements';

const mapStateToProps = (state) => ({
  domesticPreferenceState: state.Quote?.currentQuote?.DomesticPreference,
  governmentFundedState: state.Quote?.currentQuote?.GovernmentFunded,
  isExternalState: state.App.currentUser.Profile.External,
});

export default connect(mapStateToProps, {})(memo(GovernmentRequirements));

const Container = styled.div``;

const Label = styled.label`
  font-weight: 500;
`;

const Details = styled.div`
  margin-bottom: 8px;
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

const RadioGroup = styled.div``;

const WarningMessage = styled.span`
  color: #f03040;
  display: block;
  margin-top: 8px;
`;
