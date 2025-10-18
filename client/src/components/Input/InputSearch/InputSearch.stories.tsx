import type { StoryObj } from '@storybook/react';

import InputSearch from './InputSearch';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputSearch,
  title: '@components/Input/InputSearch',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
