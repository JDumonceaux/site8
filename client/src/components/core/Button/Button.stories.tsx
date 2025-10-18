// Button.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';

import Button, { VARIANTS, SIZES, type ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: '@components/Button',
  component: Button,
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    type: 'button',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label or custom node',
    },
    variant: {
      options: VARIANTS,
      control: { type: 'inline-radio' },
      description: 'Visual style variant',
    },
    size: {
      options: SIZES,
      control: { type: 'inline-radio' },
      description: 'Visual size of the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to fill its container',
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: 'select',
      description: 'HTML button type attribute',
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A styled Button supporting variants, sizes, fullWidth, and HTML types.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      {VARIANTS.map((v) => (
        <Button
          key={v}
          {...args}
          variant={v}
        >
          {v}
        </Button>
      ))}
    </div>
  ),
  name: 'Variants',
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {SIZES.map((s) => (
        <Button
          key={s}
          {...args}
          size={s}
        >
          {s}
        </Button>
      ))}
    </div>
  ),
  name: 'Sizes',
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width',
  },
};

export const SubmitType: Story = {
  args: {
    type: 'submit',
    children: 'Submit Form',
  },
};
