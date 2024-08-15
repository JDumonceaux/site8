import type { StoryObj } from '@storybook/react';
import InputFile from './InputFile';

const meta = {
  title: 'Components/Input/InputFile',
  component: InputFile,
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
