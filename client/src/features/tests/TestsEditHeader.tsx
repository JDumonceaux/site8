import type { JSX } from 'react';

import StyledLink from '@components/ui/link/styled-link/StyledLink';
import StyledPlainButton from '@components/ui/link/styled-plain-button/StyledPlainButton';
import Switch from '@components/ui/switch/Switch';
import styled from 'styled-components';

type TestsEditHeaderProps = {
  readonly isSaved: boolean;
  readonly onSave: () => void;
  readonly onShowPagesChange: (checked: boolean) => void;
  readonly showPages: boolean;
};

/**
 * Header component for the tests edit page.
 * Displays page controls including toggle, new item link, and save button.
 */
const TestsEditHeader = ({
  isSaved,
  onSave,
  onShowPagesChange,
  showPages,
}: TestsEditHeaderProps): JSX.Element => {
  return (
    <>
      <Switch
        checked={showPages}
        id="showPages"
        label={showPages ? 'Hide Pages' : 'Show Pages'}
        onCheckedChange={onShowPagesChange}
      />
      <StyledLink
        data-testid="nav-new"
        to="/admin/page/edit"
      >
        New
      </StyledLink>
      {isSaved ? null : (
        <StyledSaveButton
          data-testid="button-save"
          onClick={onSave}
          type="submit"
        >
          Save
        </StyledSaveButton>
      )}
    </>
  );
};

TestsEditHeader.displayName = 'TestsEditHeader';
export default TestsEditHeader;

const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: bold;
`;
