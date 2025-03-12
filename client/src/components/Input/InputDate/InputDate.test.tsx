import * as Form from '@radix-ui/react-form';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import InputDate from './InputDate';
describe('InputDate', () => {
  test('renders the input correctly', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputDate id="test" value="" />
        </Form.Field>
      </Form.Root>,
    );

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });
});
