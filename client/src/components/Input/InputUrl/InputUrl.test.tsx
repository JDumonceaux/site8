import * as Form from '@radix-ui/react-form';
import { render, screen } from '@testing-library/react';

import InputUrl from './InputUrl';
import '@testing-library/jest-dom';

describe('inputUrl', () => {
  test('renders the input correctly', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputUrl
            id="test"
            value="Test"
          />
        </Form.Field>
      </Form.Root>,
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });
});
