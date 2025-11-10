import React from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';

const ChannelType = ({ channelTypes, onChange, orgId, ...rest }) => {
  // 2025-10-29 - This comment is from the original code:
  // "this is a hack because we don't have access to the source of the customer (source resides on the customer master table in hubservices)
  // it is only needed for ELSE implementation -- it can be taken out after ELDS goes online"
  const source = orgId === '2010' || orgId === 'US35' ? 'AMSAP' : 'SAP';
  const data = channelTypes?.filter((x) => x.Source === source) || [];

  const options =
    data?.map((x) => ({
      key: x.ChannelType,
      value: x.Description,
    })) || [];

  return (
    <SelectForm
      handleChange={onChange}
      id="channel_type"
      label={msgFormatter('channelType')()}
      dropdownIcon="fal fa-chevron-down"
      options={options}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({
  channelTypes: state.App.filters.channelTypes,
});

export default connect(mapStateToProps, {})(ChannelType);
