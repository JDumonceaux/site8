// Tooltip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import TooltipAsterix from './Tooltips/TooltipAsterix';
import TooltipQuestionMark from './Tooltips/TooltipQuestionMark';

const meta: Meta<typeof Tooltip> = {
  title: '@components/Tooltip',
  component: Tooltip,
  argTypes: {
    triggerColor: { control: 'color' },
    delayDuration: { control: 'number' },
    disableHoverableContent: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    trigger: <button>Hover me</button>,
    content: 'Tooltip content',
  },
};

export const Colored: Story = {
  args: {
    trigger: <button>Hover me</button>,
    content: 'Colored Tooltip',
    triggerColor: 'green',
  },
};

export const Delayed: Story = {
  args: {
    trigger: <button>Hover me</button>,
    content: 'Delayed Tooltip',
    delayDuration: 500,
  },
};

export const Asterix: StoryObj<typeof TooltipAsterix> = {
  render: (args) => (
    <TooltipAsterix
      {...args}
      content="Required field"
    />
  ),
};

export const QuestionMark: StoryObj<typeof TooltipQuestionMark> = {
  render: (args) => (
    <TooltipQuestionMark
      {...args}
      content="More info"
    />
  ),
};
