import type { StoryObj } from '@storybook/react';
import InputUrl from './InputUrl';

const meta = {
  title: 'Components/Input/InputUrl',
  component: InputUrl,
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
