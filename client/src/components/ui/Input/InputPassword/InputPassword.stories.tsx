import type { StoryObj } from '@storybook/react';
import InputPassword from './InputPassword';

const meta = {
  title: 'Components/Input/InputPassword',
  component: InputPassword,
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
