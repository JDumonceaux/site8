import type { StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary'],
      },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    id: 'primary-button',
  },
};

export const Secondary: Story = {
  args: {
    id: 'secondary-button',
    children: 'Secondary Button',
    variant: 'secondary',
  },
};
