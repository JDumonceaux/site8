import type { StoryObj } from '@storybook/react';
import StyledAvatar from './StyledAvatar';

const meta = {
  title: 'Components/StyledAvatar',
  component: StyledAvatar,
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
