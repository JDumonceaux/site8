import * as Form from '@radix-ui/react-form';
import { render, screen } from '@testing-library/react';

import InputSearch from './InputSearch';
import '@testing-library/jest-dom';

describe('inputSearch', () => {
  test('renders the input correctly', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputSearch id="test" />
        </Form.Field>
      </Form.Root>,
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });
});
