import type { JSX } from 'react';
import { useRef } from 'react';

import IconButton from '@components/ui/button/icon-button/IconButton';
import { CopyIcon } from '@components/ui/icons/CopyIcon';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import styled from 'styled-components';

type CodeBlockProps = {
  readonly code: string;
};

const CodeBlock = ({ code }: CodeBlockProps): JSX.Element => {
  const codeRef = useRef<HTMLElement>(null);
  const { setErrorMessage, setMessage } = useSnackbar();

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: 'clipboard-write' as PermissionName,
      });
      if (
        permissionStatus.state === 'granted' ||
        permissionStatus.state === 'prompt'
      ) {
        await navigator.clipboard.writeText(text);
        setMessage('Copied to clipboard');
      } else {
        setErrorMessage('Copy to clipboard is not supported');
      }
    } catch {
      setErrorMessage('Failed to copy');
    }
  };

  const handleCopy = (): void => {
    const text = codeRef.current?.textContent;
    if (text && text.trim().length > 0) {
      void copyToClipboard(text);
    }
  };

  return (
    <CodeBlockContainer>
      <CodeHeader>
        <CodeLabel>Code</CodeLabel>
        <IconButton
          aria-label="Copy code to clipboard"
          onClick={handleCopy}
        >
          <CopyIcon isAriaHidden />
        </IconButton>
      </CodeHeader>
      <CodeContent>
        <code ref={codeRef}>{code}</code>
      </CodeContent>
    </CodeBlockContainer>
  );
};

export default CodeBlock;

// Styled Components

const CodeBlockContainer = styled.div`
  margin: 0;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const CodeHeader = styled.div`
  background: var(--palette-kbd);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--border-light);
`;

const CodeLabel = styled.span`
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary-color);
  text-transform: uppercase;
`;

const CodeContent = styled.pre`
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
