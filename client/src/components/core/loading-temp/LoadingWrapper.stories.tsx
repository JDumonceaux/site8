/* eslint-disable react/forbid-dom-props */
import type { Meta, StoryObj } from '@storybook/react';
import LoadingWrapper from './LoadingWrapper';

const meta: Meta<typeof LoadingWrapper> = {
  argTypes: {
    error: { control: 'text' },
    fallback: { control: false },
    isError: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    isPending: { control: 'boolean' },
    isSaving: { control: 'boolean' },
    loadingText: { control: 'text' },
  },
  component: LoadingWrapper,
  title: '@components/LoadingWrapper',
};

export default meta;

type Story = StoryObj<typeof LoadingWrapper>;

const Template: Story = {
  render: (args) => (
    <LoadingWrapper {...args}>
      <div
        style={{
          background: '#eef',
          borderRadius: '0.25rem',
          padding: '1rem',
        }}
      >
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
    fallback: <div style={{ marginTop: '0.5rem' }}>Loading placeholder</div>,
    isLoading: true,
    loadingText: 'Please wait…',
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
    error: 'Something went wrong',
    isError: true,
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
