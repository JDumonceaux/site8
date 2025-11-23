import type { StoryObj } from '@storybook/react';
import InputTel from './InputTel';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputTel,
  title: '@components/Input/InputTel',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
