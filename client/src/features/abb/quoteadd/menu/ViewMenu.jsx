import React from 'react';

import SaveButtons from './SaveButtons';

const ViewMenu = ({ data, disableSave, history }) => {
  return (
    <SaveButtons
      disabled={disableSave}
      history={history}
      quote={data?.quote}
      quoteSaveAction={data?.quoteSaveAction}
    />
  );
};

export default ViewMenu;
