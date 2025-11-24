import type { StoryObj } from '@storybook/react';
import InputNumber from './InputNumber';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputNumber,
  title: '@components/Input/InputNumber',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
