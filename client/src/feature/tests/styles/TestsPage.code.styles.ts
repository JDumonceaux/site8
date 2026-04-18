import styled from 'styled-components';

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
