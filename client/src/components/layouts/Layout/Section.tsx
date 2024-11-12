import React from 'react';

import { styled } from 'styled-components';

type Props = {
  readonly children: React.ReactNode;
};

const Section = ({ children }: Props): React.JSX.Element => (
  <StyledElement data-testid="section">{children}</StyledElement>
);

export default Section;

const StyledElement = styled.section`
  flex: 1 1 auto;
  padding: 18px;
`;
