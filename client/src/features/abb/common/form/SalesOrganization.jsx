import React from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';

const SalesOrganization = ({
  onChange,
  organization,
  organizations,
  ...rest
}) => {
  const data = organization ? [organization] : organizations;

  const options =
    data?.map((x) => ({
      key: x.OrgID,
      value: x.Description,
    })) || [];

  return (
    <SelectForm
      handleChange={onChange}
      id="sales_organization"
      label={msgFormatter('salesOrgRegion')()}
      dropdownIcon="fal fa-chevron-down"
      options={options}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({
  organizations: state.App.filters.organizations,
});

export default connect(mapStateToProps)(SalesOrganization);
