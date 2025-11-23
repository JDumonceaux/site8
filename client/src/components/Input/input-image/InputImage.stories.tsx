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
  title: '@components/Input/InputImage',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
