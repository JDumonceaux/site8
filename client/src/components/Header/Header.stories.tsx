import type { StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  argTypes: {
    variant: {
      control: {
        options: ['includeMenu', 'excludeMenu'],
        type: 'includeMenu',
      },
    },
  },
  component: Header,
  title: 'Components/Header',
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
