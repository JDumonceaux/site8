import type { StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: {
        options: ['primary', 'secondary'],
        type: 'select',
      },
    },
  },
  component: Button,
  title: 'Components/Button',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    id: 'primary-button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    id: 'secondary-button',
    variant: 'secondary',
  },
};
