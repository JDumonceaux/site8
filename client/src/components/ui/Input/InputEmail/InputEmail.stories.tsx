import type { StoryObj } from '@storybook/react';
import InputEmail from './InputEmail';

const meta = {
  title: 'Components/Input/InputEmail',
  component: InputEmail,
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
