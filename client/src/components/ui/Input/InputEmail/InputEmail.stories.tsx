import type { StoryObj } from '@storybook/react';

import InputEmail from './InputEmail';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputEmail,
  title: 'Components/Input/InputEmail',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
