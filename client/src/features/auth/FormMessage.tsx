import type { JSX } from 'react';

import styled from 'styled-components';

type Props = {
  readonly message?: string;
};

const FormMessage = ({ message }: Props): JSX.Element | null => {
  if (!message) return null;

  return <StyledMessage>{message}</StyledMessage>;
};

FormMessage.displayName = 'FormMessage';
export default FormMessage;

const StyledMessage = styled.div`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  background-color: #e3f2fd;
  color: #1976d2;
`;
