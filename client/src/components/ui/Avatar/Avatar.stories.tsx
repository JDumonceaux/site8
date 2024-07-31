import type { StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    alt: 'Avatar',
    id: 'avatar',
    src: '/avatar.jpg',
  },
  parameters: {
    docs: {
      description: {
        component: 'A styled avatar component.',
      },
    },
  },
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
