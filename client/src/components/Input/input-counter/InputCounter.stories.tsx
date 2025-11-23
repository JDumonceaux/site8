// InputCounter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InputCounter, { type InputCounterProps } from './InputCounter';

const meta: Meta<typeof InputCounter> = {
  argTypes: {
    align: { control: { type: 'radio' }, options: ['left', 'right'] },
    assistiveLabel: { control: 'text' },
    characterCount: { control: 'number' },
    id: { control: 'text' },
    isShowCounter: { control: 'boolean' },
    maxLength: { control: 'number' },
  },
  component: InputCounter,
  title: '@components/InputCounter',
};

export default meta;

type Story = StoryObj<typeof InputCounter>;

export const RightAligned: Story = {
  args: {
    align: 'right',
    assistiveLabel: 'Characters used',
    characterCount: 5,
    id: 'counter1',
    isShowCounter: true,
    maxLength: 10,
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
    isShowCounter: false,
  } as InputCounterProps,
};
