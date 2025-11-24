import type { StoryObj } from '@storybook/react';
import InputHidden from './InputHidden';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputHidden,
  title: '@components/Input/InputHidden',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
