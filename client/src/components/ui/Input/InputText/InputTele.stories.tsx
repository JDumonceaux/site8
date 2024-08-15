import type { StoryObj } from '@storybook/react';
import InputTele from './InputTele';

const meta = {
  title: 'Components/Input/InputTele',
  component: InputTele,
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
