/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// InputCheckbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InputCheckbox, { type InputCheckboxProps } from './InputCheckbox';

const meta: Meta<typeof InputCheckbox> = {
  argTypes: {
    onChange: { action: 'onChange' },
    type: { control: { disable: true } },
  },
  component: InputCheckbox,
  title: '@components/InputCheckbox',
};

export default meta;

type Story = StoryObj<typeof InputCheckbox>;

export const Default: Story = {
  args: {
    checked: false,
    fieldName: 'acceptTerms',
    id: 'checkbox-default',
    label: 'Accept Terms and Conditions',
    lineId: 'line1',
  } as InputCheckboxProps,
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  } as InputCheckboxProps,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  } as InputCheckboxProps,
};
