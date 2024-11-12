import React from 'react';

import { IconMenu } from 'components/IconMenu/IconMenu';
import { IconMenuItem } from 'components/IconMenu/IconMenuItem';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';

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
        <IconMenuItem onClick={handleScan}>Scan for New</IconMenuItem>
        <IconMenuItem>
          <a
            href="http://localhost:3005/api/images/list-duplicates"
            rel="noreferrer"
            target="_blank">
            List Duplicates
          </a>
        </IconMenuItem>
        <IconMenuItem>
          <a
            href="http://localhost:3005/api/images/fix-index"
            rel="noreferrer"
            target="_blank">
            Fix Index
          </a>
        </IconMenuItem>
        <IconMenuItem>
          <a
            href="http://localhost:3005/api/images/fix-file-names"
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

export default MenuBar;
