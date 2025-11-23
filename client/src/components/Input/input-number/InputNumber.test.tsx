import * as Form from '@radix-ui/react-form';
import { render, screen } from '@testing-library/react';
import InputNumber from './InputNumber';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';

describe('inputNumber', () => {
  test('renders the input correctly', () => {
    expect.hasAssertions();

    render(
      <Form.Root>
        <Form.Field name="test">
          <InputNumber id="test" />
        </Form.Field>
      </Form.Root>,
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });
});
