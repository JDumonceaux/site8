// Fallback.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Fallback from './Fallback';

const meta: Meta<typeof Fallback> = {
  argTypes: {
    numberOfLines: {
      control: { max: 20, min: 1, step: 1, type: 'number' },
      defaultValue: 5,
      description:
        'Number of loading lines to render (integer between 1 and 20)',
    },
  },
  component: Fallback,
  parameters: {
    docs: {
      description: {
        component:
          'A shimmer‐style loading placeholder.  Use the `lines` prop (1–20) to control how many loading bars appear.',
      },
    },
  },
  tags: ['autodocs'],
  title: '@components/Fallback',
};
export default meta;

type Story = StoryObj<typeof Fallback>;

export const Default: Story = {
  args: {
    // undefined triggers default of 5 lines
  },
};

export const CustomCount: Story = {
  args: {
    numberOfLines: 8,
  },
  name: 'Custom (8 lines)',
};

export const FractionalInput: Story = {
  args: {
    numberOfLines: 3.7,
  },
  name: 'Fractional (3.7 ➔ 3 lines)',
};

export const BelowMinimum: Story = {
  args: {
    numberOfLines: 0,
  },
  name: 'Below Min (0 ➔ clamps to 1)',
};

export const AboveMaximum: Story = {
  args: {
    numberOfLines: 100,
  },
  name: 'Above Max (100 ➔ clamps to 20)',
};
