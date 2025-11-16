import React, { memo, useMemo } from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import SelectForm from 'empower-components/SelectForm';
import PropTypes from 'prop-types';

const ChannelType = ({ channelTypes, onChange, orgId, ...rest }) => {
  // 2025-10-29 - This comment is from the original code:
  // "this is a hack because we don't have access to the source of the customer (source resides on the customer master table in hubservices)
  // it is only needed for ELSE implementation -- it can be taken out after ELDS goes online"
  const source = useMemo(
    () => (orgId === '2010' || orgId === 'US35' ? 'AMSAP' : 'SAP'),
    [orgId],
  );

  const options = useMemo(() => {
    const data = channelTypes?.filter((x) => x.Source === source) ?? [];
    return data.map((x) => ({
      key: x.ChannelType,
      value: x.Description,
    }));
  }, [channelTypes, source]);

  return (
    <SelectForm
      dropdownIcon="fal fa-chevron-down"
      handleChange={onChange}
      id="channel_type"
      label={msgFormatter('channelType')()}
      options={options}
      {...rest}
    />
  );
};

ChannelType.propTypes = {
  channelTypes: PropTypes.arrayOf(
    PropTypes.shape({
      ChannelType: PropTypes.string,
      Description: PropTypes.string,
      Source: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
  orgId: PropTypes.string,
};

ChannelType.displayName = 'ChannelType';

const mapStateToProps = (state) => ({
  channelTypes: state.App.filters.channelTypes,
});

export default connect(mapStateToProps, {})(memo(ChannelType));
