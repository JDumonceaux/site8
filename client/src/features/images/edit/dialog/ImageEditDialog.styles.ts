import styled from 'styled-components';

export const ScrollableContent = styled.div`
  max-height: calc(100dvh - 220px);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ImagePreviewContainer = styled.div`
  width: 100%;
`;

export const ImagePreview = styled.img`
  display: block;
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-light);
`;

export const Label = styled.label`
  color: var(--text-primary-color);
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
`;

export const Select = styled.select`
  background: var(--background-color);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  color: var(--text-primary-color);
  font-size: 1rem;
  padding: 0.5rem 0.75rem;

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;

export const FooterButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  width: 100%;
`;

export const DeleteButtonGroup = styled.div`
  margin-right: auto;
`;

export const CheckboxRow = styled.div`
  display: flex;
`;

export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);

  input[type='checkbox'] {
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;

export const WarningText = styled.div`
  color: var(--status-warning);
  font-size: var(--font-size-sm);
`;

export const SuggestButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;
