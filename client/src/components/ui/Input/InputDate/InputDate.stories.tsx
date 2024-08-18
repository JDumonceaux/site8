import type { StoryObj } from '@storybook/react';

import InputDate from './InputDate';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputDate,
  title: 'Components/Input/InputDate',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
