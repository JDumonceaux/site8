import type { StoryObj } from '@storybook/react';
import InputPassword from './InputPassword';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputPassword,
  title: '@components/ui/input/InputPassword',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
