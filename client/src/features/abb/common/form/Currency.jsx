import React from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';
import PropTypes from 'prop-types';

const Currency = ({ currencies, onChange, ...rest }) => {
  const options =
    currencies?.map((x) => ({
      key: x.CurrencyCode,
      value: msgFormatter(`server/currency/${x.CurrencyCode}`)(),
    })) || [];

  return (
    <SelectForm
      handleChange={onChange}
      id="currency"
      label={msgFormatter('currency')()}
      dropdownIcon="fal fa-chevron-down"
      options={options}
      {...rest}
    />
  );
};

Currency.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      CurrencyCode: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currencies: state.App.filters.currencies,
});

export default connect(mapStateToProps, {})(Currency);
