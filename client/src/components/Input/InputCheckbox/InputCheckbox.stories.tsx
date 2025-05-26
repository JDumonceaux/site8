// InputCheckbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InputCheckbox, { type InputCheckboxProps } from './InputCheckbox';

const meta: Meta<typeof InputCheckbox> = {
  title: 'Components/InputCheckbox',
  component: InputCheckbox,
  argTypes: {
    onChange: { action: 'onChange' },
    type: { control: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof InputCheckbox>;

export const Default: Story = {
  args: {
    id: 'checkbox-default',
    fieldName: 'acceptTerms',
    label: 'Accept Terms and Conditions',
    lineId: 'line1',
    checked: false,
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
