import type { JSX } from 'react';

import IconMenu from '@components/icon-menu/IconMenu';
import IconMenuItem from '@components/icon-menu/IconMenuItem';
import FormSaveButton from '@components/ui/button/FormSaveButton';
import StyledPlainButton from '@components/ui/link/styled-plain-button/StyledPlainButton';
import { ServiceUrl } from '@lib/utils/constants';

type Props = {
  readonly children?: React.ReactNode;
  readonly handleClear?: () => void;
  readonly handleRefresh?: () => void;
  readonly handleScan?: () => void;
};

const MenuBar = ({
  children,
  handleClear,
  handleRefresh,
  handleScan,
}: Props): JSX.Element => {
  const renderButton = (
    testId: string,
    onClick: (() => void) | undefined,
    type: 'button' | 'submit',
    label: string,
  ) =>
    onClick ? (
      <StyledPlainButton
        data-testid={testId}
        onClick={onClick}
        type={type}
      >
        {label}
      </StyledPlainButton>
    ) : null;

  return (
    <div>
      <IconMenu>
        {handleScan ? (
          <IconMenuItem
            key="scan"
            onClick={handleScan}
          >
            Scan for New
          </IconMenuItem>
        ) : null}
        <IconMenuItem key="duplicates">
          <a
            href={ServiceUrl.ENDPOINT_IMAGES_LIST_DUPLICATES}
            rel="noreferrer"
            target="_blank"
          >
            List Duplicates
          </a>
        </IconMenuItem>
        <IconMenuItem key="fix-index">
          <a
            href={ServiceUrl.ENDPOINT_IMAGES_FIX_INDEX}
            rel="noreferrer"
            target="_blank"
          >
            Fix Index
          </a>
        </IconMenuItem>
        <IconMenuItem key="fix-names">
          <a
            href={ServiceUrl.ENDPOINT_IMAGES_FIX_FILE_NAMES}
            rel="noreferrer"
            target="_blank"
          >
            Fix Names
          </a>
        </IconMenuItem>
        {children}
      </IconMenu>
      <div>
        {renderButton('button-refresh', handleRefresh, 'button', 'Refresh')}
        {renderButton('button-clear', handleClear, 'button', 'Clear')}
        <FormSaveButton data-testid="button-save">Save</FormSaveButton>
      </div>
    </div>
  );
};
MenuBar.displayName = 'MenuBar';

export default MenuBar;
