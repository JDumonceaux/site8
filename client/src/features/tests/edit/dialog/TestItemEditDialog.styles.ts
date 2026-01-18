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

export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  color: var(--text-primary-color);
  background: var(--background-color);

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;

export const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  color: var(--text-primary-color);
  background: var(--background-color);

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  color: var(--text-primary-color);
  background: var(--background-color);
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
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

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EmptyMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: var(--text-secondary-color);
  font-size: 0.875rem;
  border: 1px dashed var(--border-light);
  border-radius: var(--border-radius-sm);
`;
