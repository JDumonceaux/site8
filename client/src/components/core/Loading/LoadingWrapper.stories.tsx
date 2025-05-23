import type { Meta, StoryObj } from '@storybook/react';

import LoadingWrapper from './LoadingWrapper';

const meta: Meta<typeof LoadingWrapper> = {
  title: 'Components/LoadingWrapper',
  component: LoadingWrapper,
  argTypes: {
    isSaving: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    isPending: { control: 'boolean' },
    isError: { control: 'boolean' },
    error: { control: 'text' },
    loadingText: { control: 'text' },
    fallback: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingWrapper>;

const Template: Story = {
  render: (args) => (
    <LoadingWrapper {...args}>
      <div
        style={{
          padding: '1rem',
          background: '#eef',
          borderRadius: '0.25rem',
        }}>
        Here is the main content
      </div>
    </LoadingWrapper>
  ),
};

export const Default: Story = {
  ...Template,
  args: {},
};

export const Saving: Story = {
  ...Template,
  args: { isSaving: true },
};

export const Loading: Story = {
  ...Template,
  args: {
    isLoading: true,
    loadingText: 'Please wait…',
    fallback: <div style={{ marginTop: '0.5rem' }}>Loading placeholder</div>,
  },
};

export const Pending: Story = {
  ...Template,
  args: {
    isPending: true,
    loadingText: 'Fetching data…',
  },
};

export const ErrorString: Story = {
  ...Template,
  args: {
    isError: true,
    error: 'Something went wrong',
  },
};

export const ErrorInstance: Story = {
  render: () => (
    <LoadingWrapper error={new Error('Failed to load')}>
      <div>Main content still shown</div>
    </LoadingWrapper>
  ),
};

export const UnknownError: Story = {
  render: () => (
    <LoadingWrapper error={{ code: 500 } as unknown}>
      <div>Main content still shown</div>
    </LoadingWrapper>
  ),
};
