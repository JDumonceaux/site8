import React from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';

const Incoterm = ({ incoTerms, onChange, ...rest }) => {
  const options =
    incoTerms?.map((x) => ({
      key: x.OrgID,
      value: x.Description,
    })) || [];

  return (
    <SelectForm
      handleChange={onChange}
      id="incoterms"
      label={msgFormatter('incoTermsLabel')()}
      dropdownIcon="fal fa-chevron-down"
      options={options}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({
  incoTerms: state.App.filters.incoTerms,
});

export default connect(mapStateToProps, {})(Incoterm);
