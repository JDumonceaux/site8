import type { StoryObj } from '@storybook/react';
import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    variant: {
      control: {
        type: 'includeMenu',
        options: ['includeMenu', 'excludeMenu'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    includeMenu: false,
  },
};

export const WithMenu: Story = {
  args: {
    includeMenu: true,
  },
};
