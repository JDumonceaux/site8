import type { StoryObj } from '@storybook/react';
import InputImage from './InputImage';

const meta = {
  title: 'Components/Input/InputImage',
  component: InputImage,
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
