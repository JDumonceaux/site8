// Button.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';

import Button, { type ButtonProps, SIZES, VARIANTS } from './Button';

const meta: Meta<ButtonProps> = {
  args: {
    children: 'Click me',
    fullWidth: false,
    size: 'md',
    type: 'button',
    variant: 'primary',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label or custom node',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to fill its container',
    },
    onClick: { action: 'clicked' },
    size: {
      control: { type: 'inline-radio' },
      description: 'Visual size of the button',
      options: SIZES,
    },
    type: {
      control: 'select',
      description: 'HTML button type attribute',
      options: ['button', 'submit', 'reset'],
    },
    variant: {
      control: { type: 'inline-radio' },
      description: 'Visual style variant',
      options: VARIANTS,
    },
  },
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'A styled Button supporting variants, sizes, fullWidth, and HTML types.',
      },
    },
  },
  title: '@components/Button',
};
export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {};

export const AllVariants: Story = {
  name: 'Variants',
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
};

export const AllSizes: Story = {
  name: 'Sizes',
  render: (args) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
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
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width',
    fullWidth: true,
  },
};

export const SubmitType: Story = {
  args: {
    children: 'Submit Form',
    type: 'submit',
  },
};
