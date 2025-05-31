// InputEmail.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InputEmail, { type InputEmailProps } from './InputEmail';

const meta: Meta<typeof InputEmail> = {
  title: 'Components/InputEmail',
  component: InputEmail,
  argTypes: {
    type: { control: { disable: true } },
    id: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    multiple: { control: 'boolean' },
    pattern: { control: 'text' },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof InputEmail>;

export const Default: Story = {
  args: {
    id: 'email-default',
    value: '',
    placeholder: 'example@example.com',
    onChange: action('onChange'),
  } as InputEmailProps,
};

export const WithValue: Story = {
  args: {
    id: 'email-with-value',
    value: 'user@example.com',
    onChange: action('onChange'),
  } as InputEmailProps,
};

export const Multiple: Story = {
  args: {
    id: 'email-multiple',
    multiple: true,
    value: 'user1@example.com, user2@example.com',
    onChange: action('onChange'),
  } as InputEmailProps,
};

export const WithPattern: Story = {
  args: {
    id: 'email-pattern',
    pattern: '[a-z0-9._%+-]+@example\\.com',
    placeholder: 'name@example.com',
    onChange: action('onChange'),
  } as InputEmailProps,
};

export const Disabled: Story = {
  args: {
    id: 'email-disabled',
    value: '',
    disabled: true,
    placeholder: 'cannot edit',
  } as InputEmailProps,
};
