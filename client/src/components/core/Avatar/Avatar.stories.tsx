import type { Meta, StoryObj } from '@storybook/react';

import Avatar, { type AvatarProps } from './Avatar';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
  // Default props applied to all stories
  args: {
    alt: 'User Name',
    src: 'https://placekitten.com/64/64',
    size: 40,
  },
  argTypes: {
    // Expose controls for interactive tweaking
    src: { control: 'text', description: 'Image URL (http(s) only)' },
    alt: {
      control: 'text',
      description: 'Accessible alt text / fallback initials',
    },
    size: { control: 'number', description: 'Diameter in pixels' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A circular avatar. Falls back to initials (from `alt`) or custom children.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<AvatarProps>;

export const Default: Story = {
  // no need to re-specify args here, uses meta.args
};

export const FallbackInitials: Story = {
  args: {
    src: undefined,
    alt: 'Jane Doe',
  },
  name: 'Fallback → Initials',
};

export const CustomChild: Story = {
  args: {
    src: undefined,
    alt: undefined,
    children: <span>👤</span>,
  },
  name: 'Custom Child',
};
