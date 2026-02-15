// InputEmail.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InputEmail, { type InputEmailProps } from './InputEmail';

const meta: Meta<typeof InputEmail> = {
  argTypes: {
    disabled: { control: 'boolean' },
    id: { control: 'text' },
    multiple: { control: 'boolean' },
    onChange: { action: 'changed' },
    pattern: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: { disable: true } },
    value: { control: 'text' },
  },
  component: InputEmail,
  title: '@components/InputEmail',
};

export default meta;
type Story = StoryObj<typeof InputEmail>;

export const Default: Story = {
  args: {
    id: 'email-default',
    placeholder: 'example@example.com',
    value: '',
  } as InputEmailProps,
};

export const WithValue: Story = {
  args: {
    id: 'email-with-value',
    value: 'user@example.com',
  } as InputEmailProps,
};

export const Multiple: Story = {
  args: {
    id: 'email-multiple',
    multiple: true,
    value: 'user1@example.com, user2@example.com',
  } as InputEmailProps,
};

export const WithPattern: Story = {
  args: {
    id: 'email-pattern',
    pattern: String.raw`[a-z0-9._%+-]+@example\.com`,
    placeholder: 'name@example.com',
  } as InputEmailProps,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'email-disabled',
    placeholder: 'cannot edit',
    value: '',
  } as InputEmailProps,
};
