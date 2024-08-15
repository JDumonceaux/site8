import type { StoryObj } from '@storybook/react';
import InputText from './InputTele';

const meta = {
  title: 'Components/Input/InputText',
  component: InputText,
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
