import type { StoryObj } from '@storybook/react';
import InputHidden from './InputHidden';

const meta = {
  title: 'Components/Input/InputHidden',
  component: InputHidden,
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
