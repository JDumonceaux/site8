import React, { type JSX } from 'react';

import IconMenu from '@components/IconMenu/IconMenu';
import IconMenuItem from '@components/IconMenu/IconMenuItem';
import StyledPlainButton from '@components/Link/StyledPlainButton/StyledPlainButton';
import { ServiceUrl } from '@lib/utils/constants';

type Props = {
  readonly children?: React.ReactNode;
  readonly handleClear?: () => void;
  readonly handleRefresh?: () => void;
  readonly handleScan?: () => void;
  readonly handleSubmit?: () => void;
};

const MenuBar = (
  ({
    children,
    handleClear,
    handleRefresh,
    handleScan,
    handleSubmit,
  }: Props): JSX.Element => {
    const renderButton = (
      testId: string,
      onClick: (() => void) | undefined,
      type: 'button' | 'submit',
      label: string,
    ) =>
      onClick ? (
        <StyledPlainButton data-testid={testId} onClick={onClick} type={type}>
          {label}
        </StyledPlainButton>
      ) : null;

    return (
      <div>
        <IconMenu>
          {handleScan ? (
            <IconMenuItem key="scan" onClick={handleScan}>
              Scan for New
            </IconMenuItem>
          ) : null}
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
          {children}
        </IconMenu>
        {renderButton('button-refresh', handleRefresh, 'button', 'Refresh')}
        {renderButton('button-clear', handleClear, 'button', 'Clear')}
        {renderButton('button-save', handleSubmit, 'submit', 'Save')}
      </div>
    );
  },
);

MenuBar.displayName = 'MenuBar';

export default MenuBar;
