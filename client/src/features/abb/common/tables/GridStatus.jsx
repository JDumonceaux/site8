import React from 'react';

import { msgFormatter } from 'app/util';

const GridStatus = ({ statusId }) => {
  return <>{msgFormatter(`server/status/long/${statusId}`)()}</>;
};

export default GridStatus;
