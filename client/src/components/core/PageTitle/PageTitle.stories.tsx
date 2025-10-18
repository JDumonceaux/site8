// PageTitle.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import PageTitle from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  title: '@components/PageTitle',
  component: PageTitle,
  argTypes: {
    title: { control: 'text' },
    children: { control: false },
    id: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    title: 'Sample Page Title',
  },
};

export const WithChildren: Story = {
  args: {
    title: 'Page Title with Actions',
    children: <button>Action</button>,
  },
};

export const CustomId: Story = {
  args: {
    title: 'Page Title with Custom ID',
    id: 'main-page-title',
  },
};
