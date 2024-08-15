import type { StoryObj } from '@storybook/react';
import InputDate from './InputDate';

const meta = {
  title: 'Components/Input/InputDate',
  component: InputDate,
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
