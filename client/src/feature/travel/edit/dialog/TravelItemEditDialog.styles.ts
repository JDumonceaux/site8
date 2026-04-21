import styled from 'styled-components';

export const ScrollableContent = styled.div`
  max-height: calc(100dvh - 200px);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
`;

export const FooterButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
`;

export const LeftButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const RightButtons = styled.div`
  display: flex;
  gap: 1rem;
`;
