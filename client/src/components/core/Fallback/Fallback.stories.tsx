// Fallback.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Fallback from './Fallback';

const meta: Meta<typeof Fallback> = {
  title: 'Components/Fallback',
  component: Fallback,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A shimmer‐style loading placeholder.  Use the `lines` prop (1–20) to control how many loading bars appear.',
      },
    },
  },
  argTypes: {
    lines: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      description:
        'Number of loading lines to render (integer between 1 and 20)',
      defaultValue: 5,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Fallback>;

export const Default: Story = {
  args: {
    // undefined triggers default of 5 lines
  },
};

export const CustomCount: Story = {
  name: 'Custom (8 lines)',
  args: {
    lines: 8,
  },
};

export const FractionalInput: Story = {
  name: 'Fractional (3.7 ➔ 3 lines)',
  args: {
    lines: 3.7,
  },
};

export const BelowMinimum: Story = {
  name: 'Below Min (0 ➔ clamps to 1)',
  args: {
    lines: 0,
  },
};

export const AboveMaximum: Story = {
  name: 'Above Max (100 ➔ clamps to 20)',
  args: {
    lines: 100,
  },
};
