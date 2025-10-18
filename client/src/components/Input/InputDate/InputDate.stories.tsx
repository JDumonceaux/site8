// InputDate.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InputDate, { type InputDateProps } from './InputDate';

const meta: Meta<typeof InputDate> = {
  title: '@components/InputDate',
  component: InputDate,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['date', 'datetime-local', 'month', 'time', 'week'],
    },
    id: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof InputDate>;

export const Default: Story = {
  args: {
    id: 'input-date-default',
    type: 'date',
    value: '',
    onChange: action('onChange'),
  } as InputDateProps,
};

export const DateType: Story = {
  args: {
    id: 'input-date-date',
    type: 'date',
    value: '2023-01-01',
    onChange: action('onChange'),
  } as InputDateProps,
};

export const DateTimeLocalType: Story = {
  args: {
    id: 'input-date-datetime',
    type: 'datetime-local',
    value: '2023-01-01T10:30',
    onChange: action('onChange'),
  } as InputDateProps,
};

export const MonthType: Story = {
  args: {
    id: 'input-date-month',
    type: 'month',
    value: '2023-01',
    onChange: action('onChange'),
  } as InputDateProps,
};

export const TimeType: Story = {
  args: {
    id: 'input-date-time',
    type: 'time',
    value: '10:30',
    onChange: action('onChange'),
  } as InputDateProps,
};

export const WeekType: Story = {
  args: {
    id: 'input-date-week',
    type: 'week',
    value: '2023-W01',
    onChange: action('onChange'),
  } as InputDateProps,
};
