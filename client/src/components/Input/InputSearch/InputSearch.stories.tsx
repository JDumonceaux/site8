import type { StoryObj } from '@storybook/react';
import InputSearch from './InputSearch';

const meta = {
  title: 'Components/Input/InputSearch',
  component: InputSearch,
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
