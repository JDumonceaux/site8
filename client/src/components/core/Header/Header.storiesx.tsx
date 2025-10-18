// Header.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Header from './Header';
import Avatar from '@components/core/Avatar/Avatar';
import { APP_NAME } from '@lib/utils/constants';

const meta: Meta<typeof Header> = {
  title: `${APP_NAME}/Header`,
  component: Header,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `The main application header displaying **${APP_NAME}**’s logo, optional menu toggle, and avatar slot.`,
      },
    },
  },
  argTypes: {
    onMenuToggle: { action: 'menu toggled', control: false },
    avatar: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Header>;

/** Default: no menu button, no avatar */
export const Default: Story = {
  args: {},
};

/** Shows the menu toggle button only */
export const WithMenu: Story = {
  args: {
    onMenuToggle: action('menu toggled'),
  },
};

/** Shows the avatar only */
export const WithAvatar: Story = {
  args: {
    avatar: (
      <Avatar
        alt="JD"
        src="/avatar.jpg"
      >
        JD
      </Avatar>
    ),
  },
};

/** Full header: menu toggle + logo + avatar */
export const Full: Story = {
  args: {
    onMenuToggle: action('menu toggled'),
    avatar: (
      <Avatar
        alt="JD"
        src="/avatar.jpg"
      >
        JD
      </Avatar>
    ),
  },
};
