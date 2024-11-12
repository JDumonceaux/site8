import type { StoryObj } from '@storybook/react';

import InputImage from './InputImage';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputImage,
  title: 'Components/Input/InputImage',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
