import { memo } from 'react';

import styled from 'styled-components';

const Footer = (): React.JSX.Element => {
  const thisYear = new Date().getFullYear();

  return (
    <StyledFooter data-testid="footer">
      <StyledCopyright aria-label="Copyright Information">
        Copyright &copy; {thisYear}
      </StyledCopyright>
    </StyledFooter>
  );
};

Footer.displayName = 'Footer';

export default memo(Footer);

const StyledFooter = styled.footer.attrs({
  role: 'contentinfo',
})`
  background-color: var(--palette-main-color, #000);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  min-height: 20px;
  height: 40px;
`;
const StyledCopyright = styled.small`
  color: var(--palette-grey-10, #fff);
  font-size: 0.8rem;
  padding-left: 16px;
`;
