import { useEffect } from 'react';

import Button from '@components/button/Button';
import type { Meta, StoryObj } from '@storybook/react';
import Snackbar from './Snackbar';
import useSnackbar from './useSnackbar';
import styled from 'styled-components';

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
  parameters: {
    layout: 'fullscreen',
  },
  title: '@app/Snackbar',
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

export const Interactive: Story = {
  render: () => {
    const SnackbarDemo = () => {
      const { setErrorMessage, setMessage } = useSnackbar();

      return (
        <>
          <DemoContainer>
            <h2>Snackbar Demo</h2>
            <p>Click buttons below to see different snackbar variants:</p>
            <ButtonGroup>
              <Button
                onClick={() => {
                  setMessage('This is an info message', 3000);
                }}
                variant="primary"
              >
                Show Info
              </Button>
              <Button
                onClick={() => {
                  setErrorMessage('This is an error message', 3000);
                }}
                variant="secondary"
              >
                Show Error
              </Button>
            </ButtonGroup>
          </DemoContainer>
          <Snackbar />
        </>
      );
    };

    return <SnackbarDemo />;
  },
};

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
