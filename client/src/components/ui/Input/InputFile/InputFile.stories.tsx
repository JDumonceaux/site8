import type { StoryObj } from '@storybook/react';

import InputFile from './InputFile';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputFile,
  title: 'Components/Input/InputFile',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
