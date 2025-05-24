// Snackbar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import Snackbar from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Info: Story = {
  parameters: {
    /**
     * In your Storybook setup, mock the useSnackbar hook to return:
     * { data: { isOpen: true, contents: 'Informational message', variant: SnackbarVariant.INFO }, closeSnackbar: () => {} }
     */
  },
};

export const Error: Story = {
  parameters: {
    /**
     * Mock useSnackbar hook to return:
     * { data: { isOpen: true, contents: 'Error occurred', variant: SnackbarVariant.ERROR }, closeSnackbar: () => {} }
     */
  },
};
