import * as Form from '@radix-ui/react-form';
import { fireEvent, render, screen } from '@testing-library/react';
import InputTel from './InputTel';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';

describe('inputTel', () => {
  test('renders the input correctly', () => {
    expect.hasAssertions();

    render(
      <Form.Root>
        <Form.Field name="test">
          <InputTel
            id="test"
            value="Test"
          />
        </Form.Field>
      </Form.Root>,
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  test('input value changes on user input', () => {
    expect.hasAssertions();

    render(
      <Form.Root>
        <Form.Field name="test">
          <InputTel
            id="test"
            value="Test"
          />
        </Form.Field>
      </Form.Root>,
    );
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });

    expect(inputElement).toHaveValue('Hello');
  });
});
