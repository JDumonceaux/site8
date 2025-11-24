// Tooltip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import TooltipAsterix from './tooltips/TooltipAsterix';
import TooltipQuestionMark from './tooltips/TooltipQuestionMark';

const meta: Meta<typeof Tooltip> = {
  argTypes: {
    delayDuration: { control: 'number' },
    isHoverableContentDisabled: { control: 'boolean' },
    triggerColor: { control: 'color' },
  },
  component: Tooltip,
  title: '@components/Tooltip',
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Tooltip content',
    trigger: <button type="button">Hover me</button>,
  },
};

export const Colored: Story = {
  args: {
    content: 'Colored Tooltip',
    trigger: <button type="button">Hover me</button>,
    triggerColor: 'green',
  },
};

export const Delayed: Story = {
  args: {
    content: 'Delayed Tooltip',
    delayDuration: 500,
    trigger: <button type="button">Hover me</button>,
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
