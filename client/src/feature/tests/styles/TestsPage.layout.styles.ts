import styled from 'styled-components';

export const TestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
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
  gap: 0.5rem;
`;

export const TestItem = styled.li`
  background: var(--hover-background);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-md);
  padding: 0.25rem;
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
