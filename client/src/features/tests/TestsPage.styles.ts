import IconButton from '@components/ui/button/icon-button/IconButton';
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

export const TestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--text-primary-color);
  margin: 0 0 0.5rem 0;
`;

export const SectionDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary-color);
  margin: 0 0 1.5rem 0;
`;

export const GroupSection = styled.section`
  background: var(--surface-background-color);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
`;

export const GroupTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-light);
`;

export const GroupComments = styled.p`
  margin: 0 0 1rem 0;
  padding: 0.75rem;
  background: var(--background-color);
  border-left: 3px solid var(--status-warning);
  color: var(--text-secondary-color);
  font-size: 0.9rem;
  border-radius: 4px;
  font-style: italic;
`;

export const TestList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TestItem = styled.li`
  background: var(--hover-background);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: box-shadow 0.2s ease;
  cursor: grab;

  &:hover {
    box-shadow: var(--shadow-sm);
  }

  &:active {
    cursor: grabbing;
  }
`;

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
  gap: 1rem;
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

export const CodeBlockContainer = styled.div`
  margin: 0.5rem 0;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

export const CodeHeader = styled.div`
  background: var(--palette-kbd);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--border-light);
`;

export const CodeLabel = styled.span`
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary-color);
  text-transform: uppercase;
`;

export const CodeContent = styled.pre`
  margin: 0;
  padding: 0.75rem;
  background: #2d2d2d;
  color: #e0e0e0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;

  code {
    font-family: inherit;
  }
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
