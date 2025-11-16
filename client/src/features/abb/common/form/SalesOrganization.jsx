import React, { memo, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';

// SalesOrganization: Select sales org from list or single org
const SalesOrganization = ({
  onChange,
  organization,
  organizations,
  ...rest
}) => {
  // Prefer single organization if provided, else use organizations list
  const data = organization ? [organization] : organizations;

  // Memoize options for performance
  const options = useMemo(
    () =>
      data?.map((x) => ({
        key: x.OrgID,
        value: x.Description,
      })) || [],
    [data],
  );

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

SalesOrganization.propTypes = {
  onChange: PropTypes.func,
  organization: PropTypes.shape({
    OrgID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Description: PropTypes.string,
  }),
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      OrgID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Description: PropTypes.string,
    }),
  ),
};

SalesOrganization.displayName = 'SalesOrganization';

const mapStateToProps = (state) => ({
  organizations: state.App.filters.organizations,
});

export default connect(mapStateToProps)(memo(SalesOrganization));
