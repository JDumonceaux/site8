import type { StoryObj } from '@storybook/react';
import InputColor from './InputColor';

const meta = {
  title: 'Components/Input/InputColor',
  component: InputColor,
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
