import React, { memo, useCallback } from 'react';

import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';
import PropTypes from 'prop-types';

const EquipmentOwner = ({ onChange, show = true }) => {
  const handleGenericChange = useCallback(
    (field, value) => {
      if (onChange) {
        onChange(field, value);
      }
    },
    [onChange],
  );

  if (!show) {
    return null;
  }

  return (
    <>
      <InputForm
        //  inputText={this.state.quote.EquipmentOwner?.CompanyName}
        handleChange={(value) => handleGenericChange('companyName', value)}
        id="company_name"
        label={msgFormatter('companyName')()}
        maxLength={100}
      />
      <InputForm
        //  inputText={this.state.quote.EquipmentOwner?.Address}
        handleChange={(value) => handleGenericChange('address', value)}
        id="address"
        label={msgFormatter('address')()}
        maxLength={100}
      />
      <InputForm
        //  inputText={this.state.quote.EquipmentOwner?.City}
        handleChange={(value) => handleGenericChange('city', value)}
        id="city"
        label={msgFormatter('city')()}
        maxLength={100}
      />
      <InputForm
        //  inputText={this.state.quote.EquipmentOwner?.State}
        handleChange={(value) => handleGenericChange('state', value)}
        id="state"
        label={msgFormatter('state')()}
        maxLength={100}
      />
      <InputForm
        //  inputText={this.state.quote.EquipmentOwner?.PostalCode}
        handleChange={(value) => handleGenericChange('postalCode', value)}
        id="postalCode"
        label={msgFormatter('postalCode')()}
        maxLength={100}
      />
      <InputForm
        //  inputText={this.state.quote.EquipmentOwner?.Phone}
        handleChange={(value) => handleGenericChange('phone', value)}
        id="phone"
        label={msgFormatter('phone')()}
        maxLength={100}
      />
    </>
  );
};

EquipmentOwner.propTypes = {
  onChange: PropTypes.func,
  show: PropTypes.bool,
};

EquipmentOwner.displayName = 'EquipmentOwner';

export default memo(EquipmentOwner);
