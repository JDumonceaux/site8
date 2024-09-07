import type { StoryObj } from '@storybook/react';
import InputNumber from './InputNumber';

const meta = {
  title: 'Components/Input/InputNumber',
  component: InputNumber,
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
