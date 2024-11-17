import React, { memo } from 'react';

import { IconMenu } from 'components/IconMenu/IconMenu';
import { IconMenuItem } from 'components/IconMenu/IconMenuItem';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import { ServiceUrl } from 'lib/utils/constants';

type Props = {
  readonly handleRefresh: () => void;
  readonly handleScan: () => void;
  readonly handleSubmit: () => void;
};

const MenuBar = ({
  handleRefresh,
  handleScan,
  handleSubmit,
}: Props): React.JSX.Element => {
  return (
    <>
      <IconMenu>
        <IconMenuItem key="scan" onClick={handleScan}>
          Scan for New
        </IconMenuItem>
        <IconMenuItem key="list-duplicates">
          <a
            href={ServiceUrl.ENDPOINT_IMAGES_LIST_DUPLICATES}
            rel="noreferrer"
            target="_blank">
            List Duplicates
          </a>
        </IconMenuItem>
        <IconMenuItem key="fix-index">
          <a
            href={ServiceUrl.ENDPOINT_IMAGES_FIX_INDEX}
            rel="noreferrer"
            target="_blank">
            Fix Index
          </a>
        </IconMenuItem>
        <IconMenuItem key="fix-names">
          <a
            href={ServiceUrl.ENDPOINT_IMAGES_FIX_FILE_NAMES}
            rel="noreferrer"
            target="_blank">
            Fix Names
          </a>
        </IconMenuItem>
      </IconMenu>
      <StyledPlainButton
        data-testid="button-refresh"
        onClick={handleRefresh}
        type="submit">
        Refresh
      </StyledPlainButton>
      <StyledPlainButton
        data-testid="button-save"
        onClick={handleSubmit}
        type="submit">
        Save
      </StyledPlainButton>
    </>
  );
};

export default memo(MenuBar);
