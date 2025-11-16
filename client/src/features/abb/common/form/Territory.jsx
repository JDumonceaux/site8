import React, { memo, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';

// Territory: Select territory from list or single territory
const Territory = ({ onChange, territory, ...rest }) => {
  // Prefer single territory if provided, else empty
  const data = territory ? [territory] : [];

  // Memoize options for performance
  const options = useMemo(
    () =>
      data?.map((x) => ({
        key: x.TerritoryID,
        value: x.Description,
      })) || [],
    [data],
  );

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

Territory.propTypes = {
  onChange: PropTypes.func,
  territory: PropTypes.shape({
    TerritoryID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Description: PropTypes.string,
  }),
};

Territory.displayName = 'Territory';

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(memo(Territory));
