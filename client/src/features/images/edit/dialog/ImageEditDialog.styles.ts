import styled from 'styled-components';

export const ScrollableContent = styled.div`
  max-height: calc(100dvh - 220px);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 0;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ImagePreviewContainer = styled.div`
  margin-bottom: 1.25rem;
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

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const FooterMessageArea = styled.div`
  color: var(--input-error-color, #b91c1c);
  font-size: 0.75rem;
  min-height: 1.25rem;
  padding: 0.375rem 0 0;
`;

export const IdentifyStatusSection = styled.div<{
  readonly $tone: 'error' | 'info' | 'success';
}>`
  color: ${({ $tone }) => {
    switch ($tone) {
      case 'error': {
        return 'var(--input-error-color, #b91c1c)';
      }
      case 'success': {
        return 'var(--status-success, #15803d)';
      }
      default: {
        return 'var(--text-secondary-color)';
      }
    }
  }};
  font-size: 0.75rem;
  min-height: 1rem;
  white-space: pre-wrap;
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

export const SuggestAdornmentButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  font-size: var(--font-size-sm);
  padding: 0;

  &:hover {
    color: var(--text-primary-color);
    text-decoration: underline;
    text-underline-position: under;
  }

  &:focus-visible {
    text-decoration: underline;
    text-decoration-color: var(--text-tertiary-color);
    text-decoration-color: color-mix(
      in srgb,
      var(--text-tertiary-color) 65%,
      transparent
    );
    text-underline-position: under;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
