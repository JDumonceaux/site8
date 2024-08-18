import type { StoryObj } from '@storybook/react';

import Avatar from './Avatar';

const meta = {
  args: {
    alt: 'Avatar',
    id: 'avatar',
    src: '/avatar.jpg',
  },
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'A styled avatar component.',
      },
    },
  },
  title: 'Components/Avatar',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'Avatar',
    id: 'avatar',
    src: '/avatar.jpg',
  },
};
