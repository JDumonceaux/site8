import React, { useRef } from 'react';

import { IconButton } from 'components/form/IconButton/IconButton';
import { CopyIcon } from 'components/icons/CopyIcon';
import { styled } from 'styled-components';

type RenderCodeProps = {
  readonly children?: React.ReactNode;
};

/**
 * Renders a secton of code with a copy button for the generic page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The code to be rendered.
 * @returns {React.JSX.Element} The rendered code block.
 */
const RenderCode = ({ children }: RenderCodeProps) => {
  const ref = useRef<HTMLElement>(null);

  const copyToClipboard = async (text: string) => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: 'clipboard-write' as PermissionName,
      });
      if (
        permissionStatus.state === 'granted' ||
        permissionStatus.state === 'prompt'
      ) {
        await navigator.clipboard.writeText(text);
        alert('Copied.');
      } else {
        alert('Copy to clipboard is not supported.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to copy.');
    }
  };

  const handleCopy = () => {
    const text = ref.current?.innerText;
    if (text) {
      copyToClipboard(text);
    }
  };

  return (
    <CodeBlock>
      <StyledHeader>
        <div>JavaScript</div>
        <IconButton aria-label="Copy" id="copy" onClick={handleCopy}>
          <CopyIcon aria-hidden focusable={false} />
        </IconButton>
      </StyledHeader>
      <StyledElement>
        <code ref={ref}>{children}</code>
      </StyledElement>
    </CodeBlock>
  );
};

export default RenderCode;

const CodeBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledHeader = styled.div`
  background-color: var(--palette-kbd);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;
const StyledElement = styled.pre`
  background-color: var(--palette-dark-background);
  color: var(--palette-dark-text);
  padding: 12px;
  overflow-x: auto;
  var {
    color: var(--palette-var);
  }
  samp {
    color: var(--palette-samp);
  }
  kbd {
    color: var(--palette-kbd);
  }
`;
