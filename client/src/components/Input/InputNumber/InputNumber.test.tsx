import * as Form from '@radix-ui/react-form';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import InputNumber from './InputNumber';
describe('InputNumber', () => {
  test('renders the input correctly', () => {
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
