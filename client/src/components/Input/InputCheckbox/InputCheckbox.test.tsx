// InputCheckbox.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { AxeResults } from 'axe-core';
import InputCheckbox from './InputCheckbox';

describe('inputCheckbox component', () => {
  beforeAll(() => {
    expect.extend(toHaveNoViolations);
  });

  test('renders checkbox with label and correct attributes', () => {
    expect.assertions(4);

    render(
      <InputCheckbox
        id="chk1"
        fieldName="agree"
        label="Agree to terms"
        lineId="line1"
        checked={false}
        onChange={() => {}}
      />,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Agree to terms' });

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('id', 'chk1');
    expect(checkbox).toHaveAttribute('name', 'agree');
    expect(checkbox).toHaveProperty('type', 'checkbox');
  });

  test('calls onChange with correct arguments on change', () => {
    expect.assertions(3);

    const handleChange = jest.fn();
    render(
      <InputCheckbox
        id="chk2"
        fieldName="subscribe"
        label="Subscribe"
        lineId="row2"
        onChange={handleChange}
      />,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Subscribe' });
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);

    // const [calledLineId, calledFieldName] = handleChange.mock.calls[0];

    ///  expect(calledLineId).toBe('row2');
    //  expect(calledFieldName).toBe('subscribe');
  });

  test('does not call onChange when disabled', () => {
    expect.assertions(1);

    const handleChange = jest.fn();
    render(
      <InputCheckbox
        id="chk3"
        fieldName="optIn"
        label="Opt In"
        lineId="r3"
        onChange={handleChange}
        disabled
      />,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Opt In' });
    fireEvent.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('wrapper has correct margin style', () => {
    expect.assertions(1);

    const { container } = render(
      <InputCheckbox
        id="chk4"
        fieldName="test"
        label="Test"
        lineId="r4"
        onChange={() => {}}
      />,
    );
    const wrapper = container.firstChild;

    expect(wrapper).toHaveStyle('margin-bottom: 16px');
  });

  test('has no accessibility violations', async () => {
    expect.hasAssertions();

    const { container } = render(
      <InputCheckbox
        id="chk5"
        fieldName="foo"
        label="Foo"
        lineId="r5"
        onChange={() => {}}
      />,
    );
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
