import type { JSX } from 'react';
import { useRef } from 'react';

import IconButton from '@components/ui/button/icon-button/IconButton';
import { CopyIcon } from '@components/ui/icons/CopyIcon';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import {
  CodeBlockContainer,
  CodeContent,
  CodeHeader,
  CodeLabel,
} from '../TestsPage.styles';

type CodeBlockProps = {
  readonly code: string;
  readonly type?: string;
};

const CodeBlock = ({ code, type }: CodeBlockProps): JSX.Element => {
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
        <CodeLabel>{type?.trim() || 'Code'}</CodeLabel>
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
