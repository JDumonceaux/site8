import { memo } from 'react';

import styled from 'styled-components';

type PageTitleProps = {
  readonly children?: React.ReactNode;
  readonly ref?: React.Ref<HTMLDivElement>;
  readonly title?: React.ReactNode;
};
const PageTitle = ({
  children,
  ref,
  title,
}: PageTitleProps): null | React.JSX.Element => {
  if (!title) {
    return null;
  }

  return (
    <StyledWrapper ref={ref}>
      {title ? (
        <div>
          <StyledElement data-testid="page-title">{title}</StyledElement>
        </div>
      ) : null}
      <StyledChildren>{children}</StyledChildren>
    </StyledWrapper>
  );
};

PageTitle.displayName = 'PageTitle';

export default memo(PageTitle);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  row-gap: 12px;
  width: 100%;
  border-bottom: 1px solid #888;
  padding-bottom: 6px;
  margin-bottom: 18px;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 0.75rem;
  background-color: var(--page-background-color);
`;
const StyledElement = styled.h1`
  color: var(--palette-page-title);
  font-size: 2.25rem;
  display: inline-block;
  margin: 0;
`;
const StyledChildren = styled.div`
  display: inline-flex;
  align-items: baseline;
  button,
  a {
    margin-left: 12px;
  }
`;
