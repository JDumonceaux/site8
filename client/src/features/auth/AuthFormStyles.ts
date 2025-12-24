import styled from 'styled-components';

export const StyledForm = styled.form`
  padding: 20px 0;
`;

export const StyledBottomMsg = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;

export const InstDiv = styled.div`
  padding: 10px 0;
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.textSecondary || '#666'};
`;
