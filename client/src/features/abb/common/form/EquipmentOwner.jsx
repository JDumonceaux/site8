import React from 'react';
import { connect } from 'react-redux';

import { showUserSearchModal } from 'actions/CustomerActions';
import { msgFormatter } from 'app/util';
import InputForm from 'empower-components/InputForm';

const EquipmentOwner = ({ onChange, show }) => {
  if (!show) {
    return null;
  }

  const handleGenericChange = () => {
    onChange(field, val);
  };

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

export default connect(null, { showUserSearchModal })(EquipmentOwner);
