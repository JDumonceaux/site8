import React from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';

const Territory = ({ onChange, territory, ...rest }) => {
  const data = territory ? [territory] : [];

  const options =
    data?.map((x) => ({
      key: x.TerritoryID,
      value: x.Description,
    })) || [];

  return (
    <SelectForm
      handleChange={onChange}
      id="territory"
      label={msgFormatter('territory')()}
      dropdownIcon="fal fa-chevron-down"
      options={options}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Territory);
