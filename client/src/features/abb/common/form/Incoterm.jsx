import React, { memo, useMemo } from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';
import PropTypes from 'prop-types';

const Incoterm = ({ incoTerms, onChange, ...rest }) => {
  const options = useMemo(
    () =>
      incoTerms?.map((x) => ({
        key: x.OrgID,
        value: x.Description,
      })) ?? [],
    [incoTerms],
  );

  return (
    <SelectForm
      dropdownIcon="fal fa-chevron-down"
      handleChange={onChange}
      id="incoterms"
      label={msgFormatter('incoTermsLabel')()}
      options={options}
      {...rest}
    />
  );
};

Incoterm.propTypes = {
  incoTerms: PropTypes.arrayOf(
    PropTypes.shape({
      Description: PropTypes.string,
      OrgID: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
};

Incoterm.displayName = 'Incoterm';

const mapStateToProps = (state) => ({
  incoTerms: state.App.filters.incoTerms,
});

export default connect(mapStateToProps, {})(memo(Incoterm));
