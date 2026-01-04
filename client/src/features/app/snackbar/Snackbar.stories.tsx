import { useCallback, useEffect } from 'react';

import Button from '@components/ui/button/Button';
// Snackbar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Snackbar from './Snackbar';
import useSnackbar from './useSnackbar';
import styled from 'styled-components';

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
  parameters: {
    layout: 'fullscreen',
  },
  title: '@features/Snackbar',
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

const DemoContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

/**
 * Interactive demo showing all Snackbar variants and features.
 * Click buttons to trigger different snackbar types.
 */
export const Interactive: Story = {
  render: () => {
    const SnackbarDemo = () => {
      const { setErrorMessage, setMessage } = useSnackbar();

      const handleShowInfo = useCallback(() => {
        setMessage('This is an info message', 3000);
      }, [setMessage]);

      const handleShowError = useCallback(() => {
        setErrorMessage('This is an error message', 3000);
      }, [setErrorMessage]);

      const handleShortMessage = useCallback(() => {
        setMessage('Short', 3000);
      }, [setMessage]);

      const handleMediumMessage = useCallback(() => {
        setMessage(
          'This is a medium length message that provides more context',
          3000,
        );
      }, [setMessage]);

      const handleLongMessage = useCallback(() => {
        setMessage(
          'This is a very long message that demonstrates how the snackbar handles extensive text content and whether it truncates properly with ellipsis or wraps to multiple lines',
          3000,
        );
      }, [setMessage]);

      const handleDuration1s = useCallback(() => {
        setMessage('Shows for 1 second', 1000);
      }, [setMessage]);

      const handleDuration3s = useCallback(() => {
        setMessage('Shows for 3 seconds', 3000);
      }, [setMessage]);

      const handleDuration10s = useCallback(() => {
        setMessage('Shows for 10 seconds', 10_000);
      }, [setMessage]);

      return (
        <>
          <DemoContainer>
            <h2>Snackbar Demo</h2>
            <p>Click buttons below to see different snackbar variants:</p>

            <ButtonGroup>
              <Button
                onClick={handleShowInfo}
                variant="primary"
              >
                Show Info
              </Button>
              <Button
                onClick={handleShowError}
                variant="secondary"
              >
                Show Error
              </Button>
            </ButtonGroup>

            <h3>Message Length Tests</h3>
            <ButtonGroup>
              <Button
                onClick={handleShortMessage}
                variant="ghost"
              >
                Short Message
              </Button>
              <Button
                onClick={handleMediumMessage}
                variant="ghost"
              >
                Medium Message
              </Button>
              <Button
                onClick={handleLongMessage}
                variant="ghost"
              >
                Long Message
              </Button>
            </ButtonGroup>

            <h3>Duration Tests</h3>
            <ButtonGroup>
              <Button
                onClick={handleDuration1s}
                variant="discreet"
              >
                1s Duration
              </Button>
              <Button
                onClick={handleDuration3s}
                variant="discreet"
              >
                3s Duration
              </Button>
              <Button
                onClick={handleDuration10s}
                variant="discreet"
              >
                10s Duration
              </Button>
            </ButtonGroup>

            <p>
              <strong>Keyboard Shortcut:</strong> Press <code>Escape</code> to
              close the snackbar
            </p>
          </DemoContainer>
          <Snackbar />
        </>
      );
    };

    return <SnackbarDemo />;
  },
};

/**
 * Info variant - default notification style for general information
 */
export const InfoVariant: Story = {
  render: () => {
    const InfoDemo = () => {
      const { setMessage } = useSnackbar();

      useEffect(() => {
        setMessage('This is an informational message', 10_000);
      }, [setMessage]);

      return <Snackbar />;
    };

    return <InfoDemo />;
  },
};

/**
 * Error variant - used for error messages and failures
 */
export const ErrorVariant: Story = {
  render: () => {
    const ErrorDemo = () => {
      const { setErrorMessage } = useSnackbar();

      useEffect(() => {
        setErrorMessage('An error occurred during the operation', 10_000);
      }, [setErrorMessage]);

      return <Snackbar />;
    };

    return <ErrorDemo />;
  },
};

/**
 * Short message demonstration
 */
export const ShortMessage: Story = {
  render: () => {
    const ShortMessageDemo = () => {
      const { setMessage } = useSnackbar();

      useEffect(() => {
        setMessage('Saved!', 10_000);
      }, [setMessage]);

      return <Snackbar />;
    };

    return <ShortMessageDemo />;
  },
};

/**
 * Long message demonstration - shows text truncation with ellipsis
 */
export const LongMessage: Story = {
  render: () => {
    const LongMessageDemo = () => {
      const { setMessage } = useSnackbar();

      useEffect(() => {
        setMessage(
          'This is a very long message that demonstrates how the snackbar component handles extensive text content. The message should truncate with an ellipsis to maintain the single-line layout and prevent overflow issues in the UI.',
          10_000,
        );
      }, [setMessage]);

      return <Snackbar />;
    };

    return <LongMessageDemo />;
  },
};

/**
 * Auto-dismiss behavior with 3 second duration
 */
export const AutoDismiss: Story = {
  render: () => {
    const AutoDismissDemo = () => {
      const { setMessage } = useSnackbar();

      useEffect(() => {
        setMessage('This message will auto-dismiss in 3 seconds', 3000);
      }, [setMessage]);

      return (
        <>
          <DemoContainer>
            <p>Watch the snackbar disappear automatically after 3 seconds</p>
          </DemoContainer>
          <Snackbar />
        </>
      );
    };

    return <AutoDismissDemo />;
  },
};

/**
 * Closed state - shows that nothing renders when closed
 */
export const Closed: Story = {
  render: () => <Snackbar />,
};
