'use client';

import { Copy } from 'components/Icons/Copy';
import { IconButton } from 'components/form/IconButton/IconButton';
import React, { useRef } from 'react';
import { styled } from 'styled-components';

type RenderCodeProps = {
  readonly children?: React.ReactNode;
};

export const RenderCode = ({ children }: RenderCodeProps) => {
  const ref = useRef(null);

  const isCopyPermitted = () => {
    navigator.permissions
      .query({ name: 'clipboard-write' as PermissionName })
      .then((permissionStatus) => {
        if (
          permissionStatus.state === 'granted' ||
          permissionStatus.state === 'prompt'
        ) {
          return true;
        } else {
          alert('Copy to clipboard is not supported.');
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return false;
  };

  const copyToClipboard = async (text: string) => {
    if (isCopyPermitted() === false) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Copied.');
      } catch (err) {
        alert('Failed to copy.');
      }
    }
  };

  const handleCopy = () => {
    const node = ref?.current ? (ref.current as HTMLElement) : null;
    const text = node ? node.innerText : undefined;
    if (text) {
      copyToClipboard(text);
    }
  };

  return (
    <>
      <StyledHeader>
        <div>JavaScript</div>
        <div>
          <IconButton aria-label="Copy" id="copy" onClick={handleCopy}>
            <Copy ariaHidden focusable={false} />
          </IconButton>
        </div>
      </StyledHeader>
      <StyledElement>
        <code ref={ref}>{children}</code>
      </StyledElement>
    </>
  );
};

export default RenderCode;

const StyledHeader = styled.div`
  background-color: var(--palette-kbd);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledElement = styled.pre`
  background-color: var(--palette-dark-background);
  color: var(--palette-dark-text);
  padding: 12px;
  var {
    color: var(--palette-var);
  },
  samp {
    color: var(--palette-samp);
  },
  kbd {
    color: var(--palette-kbd);
  },
`;
