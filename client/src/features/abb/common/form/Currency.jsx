import React, { memo, useMemo } from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';
import PropTypes from 'prop-types';

const Currency = ({ currencies, onChange, ...rest }) => {
  const options = useMemo(
    () =>
      currencies?.map((x) => ({
        key: x.CurrencyCode,
        value: msgFormatter(`server/currency/${x.CurrencyCode}`)(),
      })) ?? [],
    [currencies],
  );

  return (
    <SelectForm
      dropdownIcon="fal fa-chevron-down"
      handleChange={onChange}
      id="currency"
      label={msgFormatter('currency')()}
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

Currency.displayName = 'Currency';

const mapStateToProps = (state) => ({
  currencies: state.App.filters.currencies,
});

export default connect(mapStateToProps, {})(memo(Currency));
