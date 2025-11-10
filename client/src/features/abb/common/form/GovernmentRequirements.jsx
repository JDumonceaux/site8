import React from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import RadioButton from 'empower-components/RadioButton';

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

  const message = React.useMemo(() => {
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

  return (
    <div>
      <label>{msgFormatter('governmentRequirements')()}</label>
      <div>{msgFormatter('governmentRequirementsDetails')()}</div>
      <div className="radio-mandatory-container">
        <div className="radio-group">
          <RadioButton
            checked={localValues.governmentFundedAnswer === 'yes'}
            disabled={localValues.govFundedYesDisabled}
            handleSelect={() => onChange('yes')}
            label={msgFormatter('yes')()}
          />
        </div>
        <div className="radio-group">
          <RadioButton
            checked={localValues.governmentFundedAnswer === 'no'}
            disabled={localValues.govFundedNoDisabled}
            handleSelect={() => onChange('no')}
            label={msgFormatter('no')()}
          />
        </div>
        {localValues.domesticPreference || localValues.isExternal ? (
          <div className="radio-group">
            <RadioButton
              checked={localValues.governmentFundedAnswer === 'dpo'}
              disabled={localValues.dpoDisabled}
              handleSelect={() => onChange('dpo')}
              label={msgFormatter('govFundedDpo')()}
            />
          </div>
        ) : null}
      </div>
      <span
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          color: 'red',
        }}
      >
        {message}
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  domesticPreferenceState: state.Quote?.currentQuote?.DomesticPreference,
  governmentFundedState: state.Quote?.currentQuote?.GovernmentFunded,
  isExternalState: state.App.currentUser.Profile.External,
});

export default connect(mapStateToProps, {})(GovernmentRequirements);
