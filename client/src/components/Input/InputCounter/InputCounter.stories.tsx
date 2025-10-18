// InputCounter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InputCounter, { type InputCounterProps } from './InputCounter';

const meta: Meta<typeof InputCounter> = {
  title: '@components/InputCounter',
  component: InputCounter,
  argTypes: {
    align: { control: { type: 'radio' }, options: ['left', 'right'] },
    assistiveLabel: { control: 'text' },
    characterCount: { control: 'number' },
    maxLength: { control: 'number' },
    showCounter: { control: 'boolean' },
    id: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof InputCounter>;

export const RightAligned: Story = {
  args: {
    id: 'counter1',
    showCounter: true,
    characterCount: 5,
    maxLength: 10,
    align: 'right',
    assistiveLabel: 'Characters used',
  } as InputCounterProps,
};

export const LeftAligned: Story = {
  args: {
    ...RightAligned.args,
    align: 'left',
    assistiveLabel: 'Count',
  } as InputCounterProps,
};

export const Hidden: Story = {
  args: {
    id: 'counter-hidden',
    showCounter: false,
  } as InputCounterProps,
};
