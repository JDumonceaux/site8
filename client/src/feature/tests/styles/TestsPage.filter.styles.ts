import styled from 'styled-components';

export const FilterSection = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--surface-background-color);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-md);
`;

export const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  margin: 0 0 1rem 0;
`;

export const ToggleRow = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const ToggleText = styled.span`
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--text-primary-color);
`;

export const ToggleInput = styled.input`
  appearance: none;
  width: 2.5rem;
  height: 1.4rem;
  border-radius: 999px;
  background: var(--border-light);
  position: relative;
  transition: background 0.2s ease;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 0.15rem;
    left: 0.15rem;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    background: var(--surface-background-color);
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s ease;
  }

  &:checked {
    background: var(--status-info);
  }

  &:checked::after {
    transform: translateX(1.1rem);
  }

  &:focus-visible {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary-color);
`;

export const FilterSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  color: var(--text-primary-color);
  background: var(--background-color);
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;
