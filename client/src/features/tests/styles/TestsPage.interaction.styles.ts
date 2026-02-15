import IconButton from '@components/button/icon-button/IconButton';
import styled from 'styled-components';

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-primary-color);
  }

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const TestItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const EditIconButton = styled(IconButton)`
  color: var(--text-secondary-color);
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);

  &:hover:not(:disabled) {
    color: var(--status-info);
    background-color: var(--hover-background);
  }

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
    border-radius: var(--border-radius-sm);
  }

  i {
    display: block;
  }
`;

export const TestItemName = styled.div`
  flex: 1;
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  cursor: pointer;
  padding: 0.25rem 0;
  margin: 0;

  &:hover {
    color: var(--status-info);
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  background: var(--status-info);
  color: var(--text-inverted-color);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
`;

export const TestComments = styled.p`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: var(--background-color);
  border-left: 3px solid var(--status-info);
  color: var(--text-secondary-color);
  font-size: 0.85rem;
  border-radius: 4px;
`;

export const TestMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-light);
`;

export const MetaItem = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary-color);
`;
