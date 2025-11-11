// InputDate.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import InputDate, { type InputDateProps } from './InputDate';

const meta: Meta<typeof InputDate> = {
  argTypes: {
    id: { control: 'text' },
    onChange: { action: 'changed' },
    type: {
      control: { type: 'select' },
      options: ['date', 'datetime-local', 'month', 'time', 'week'],
    },
    value: { control: 'text' },
  },
  component: InputDate,
  title: '@components/InputDate',
};

export default meta;
type Story = StoryObj<typeof InputDate>;

export const Default: Story = {
  args: {
    id: 'input-date-default',
    onChange: action('onChange'),
    type: 'date',
    value: '',
  } as InputDateProps,
};

export const DateType: Story = {
  args: {
    id: 'input-date-date',
    onChange: action('onChange'),
    type: 'date',
    value: '2023-01-01',
  } as InputDateProps,
};

export const DateTimeLocalType: Story = {
  args: {
    id: 'input-date-datetime',
    onChange: action('onChange'),
    type: 'datetime-local',
    value: '2023-01-01T10:30',
  } as InputDateProps,
};

export const MonthType: Story = {
  args: {
    id: 'input-date-month',
    onChange: action('onChange'),
    type: 'month',
    value: '2023-01',
  } as InputDateProps,
};

export const TimeType: Story = {
  args: {
    id: 'input-date-time',
    onChange: action('onChange'),
    type: 'time',
    value: '10:30',
  } as InputDateProps,
};

export const WeekType: Story = {
  args: {
    id: 'input-date-week',
    onChange: action('onChange'),
    type: 'week',
    value: '2023-W01',
  } as InputDateProps,
};
