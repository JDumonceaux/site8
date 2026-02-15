import type { Meta, StoryObj } from '@storybook/react';
import LoadingWrapper from './LoadingWrapper';
import styled from 'styled-components';

const MainContent = styled.div`
  background: #eef;
  border-radius: 0.25rem;
  padding: 1rem;
`;

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
  render: (args: React.ComponentProps<typeof LoadingWrapper>) => (
    <LoadingWrapper {...args}>
      <MainContent>Here is the main content</MainContent>
    </LoadingWrapper>
  ),
};

export const Default: Story = {
  ...Template,
  args: {},
};

export const Saving: Story = {
  ...Template,
  args: { isSaving: true } as React.ComponentProps<typeof LoadingWrapper>,
};

const FallbackContent = styled(MainContent)`
  margin-top: 0.5rem;
`;

export const Loading: Story = {
  ...Template,
  args: {
    fallback: <FallbackContent>Loading placeholder</FallbackContent>,
    isLoading: true,
    loadingText: 'Please wait…',
  } as React.ComponentProps<typeof LoadingWrapper>,
};

export const Pending: Story = {
  ...Template,
  args: {
    isPending: true,
    loadingText: 'Fetching data…',
  } as React.ComponentProps<typeof LoadingWrapper>,
};

export const ErrorString: Story = {
  ...Template,
  args: {
    error: 'Something went wrong',
    isError: true,
  } as React.ComponentProps<typeof LoadingWrapper>,
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
