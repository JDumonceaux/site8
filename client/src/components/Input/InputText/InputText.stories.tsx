import type { StoryObj } from '@storybook/react';

import InputText from './InputText';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputText,
  title: '@components/Input/InputText',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
