// PageTitle.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import PageTitle from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  argTypes: {
    children: { control: false },
    id: { control: 'text' },
    title: { control: 'text' },
  },
  component: PageTitle,
  title: '@components/PageTitle',
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
    children: <button type="button">Action</button>,
    title: 'Page Title with Actions',
  },
};

export const CustomId: Story = {
  args: {
    id: 'main-page-title',
    title: 'Page Title with Custom ID',
  },
};
