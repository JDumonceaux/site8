import type { Meta, StoryObj } from '@storybook/react';

import Avatar, { type AvatarProps } from './Avatar';

const meta: Meta<AvatarProps> = {
  // Default props applied to all stories
  args: {
    alt: 'User Name',
    size: 40,
    src: 'https://placekitten.com/64/64',
  },
  argTypes: {
    alt: {
      control: 'text',
      description: 'Accessible alt text / fallback initials',
    },
    size: { control: 'number', description: 'Diameter in pixels' },
    // Expose controls for interactive tweaking
    src: { control: 'text', description: 'Image URL (http(s) only)' },
  },
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'A circular avatar. Falls back to initials (from `alt`) or custom children.',
      },
    },
  },
  title: '@components/Avatar',
};
export default meta;

type Story = StoryObj<AvatarProps>;

export const Default: Story = {
  // no need to re-specify args here, uses meta.args
};

export const FallbackInitials: Story = {
  args: {
    alt: 'Jane Doe',
    src: undefined,
  },
  name: 'Fallback → Initials',
};

export const CustomChild: Story = {
  args: {
    alt: undefined,
    children: <span>👤</span>,
    src: undefined,
  },
  name: 'Custom Child',
};
