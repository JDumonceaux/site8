import React, { memo, useMemo } from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';
import PropTypes from 'prop-types';

const OutputLanguage = ({ cultures, onChange, ...rest }) => {
  const options = useMemo(
    () =>
      cultures?.map((x) => ({
        key: x.CultureCode,
        value: msgFormatter(`server/cultureCode/${x.CultureCode}`)(),
      })) ?? [],
    [cultures],
  );

  return (
    <SelectForm
      dropdownIcon="fal fa-chevron-down"
      handleChange={onChange}
      id="output_language"
      label={msgFormatter('outputLanguage')()}
      options={options}
      {...rest}
    />
  );
};

OutputLanguage.propTypes = {
  cultures: PropTypes.arrayOf(
    PropTypes.shape({
      CultureCode: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
};

OutputLanguage.displayName = 'OutputLanguage';

const mapStateToProps = (state) => ({
  cultures: state.App.filters.cultures,
});

export default connect(mapStateToProps, {})(memo(OutputLanguage));
