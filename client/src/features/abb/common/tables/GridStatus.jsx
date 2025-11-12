import React from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';

const GridStatus = ({ statusId }) => {
  return <>{msgFormatter(`server/status/long/${statusId}`)()}</>;
};

GridStatus.propTypes = {
  statusId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default GridStatus;
