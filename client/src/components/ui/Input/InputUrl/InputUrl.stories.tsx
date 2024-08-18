import type { StoryObj } from '@storybook/react';

import InputUrl from './InputUrl';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputUrl,
  title: 'Components/Input/InputUrl',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
