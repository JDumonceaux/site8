import type { StoryObj } from '@storybook/react';

import InputColor from './InputColor';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputColor,
  title: 'Components/Input/InputColor',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
