import React from "react";
import { connect } from "react-redux";

import { msgFormatter } from "app/util";
import SelectForm from "empower-components/SelectForm";

const OutputLanguage = ({ cultures, onChange, ...rest }) => {
    const options =
        cultures?.map(x => ({
            key: x.CultureCode,
            value: msgFormatter(`server/cultureCode/${x.CultureCode}`)()
        })) || [];

    console.log("cultures:", options);

    return (
      <SelectForm
        handleChange={onChange}
        id="output_language"
        label={msgFormatter("outputLanguage")()}
        dropdownIcon="fal fa-chevron-down"
        options={options}
        {...rest}
      />
    );
};

const mapStateToProps = state => ({
    cultures: state.App.filters.cultures
});

export default connect(mapStateToProps, {})(OutputLanguage);
