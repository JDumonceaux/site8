import type { StoryObj } from '@storybook/react';

import InputText from './InputTele';

const meta = {
  argTypes: {
    variant: {
      control: {
        type: 'id',
      },
    },
  },
  component: InputText,
  title: 'Components/Input/InputText',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'test',
  },
};
