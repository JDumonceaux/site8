import * as Form from '@radix-ui/react-form';
import { render, screen } from '@testing-library/react';
import InputHidden from './InputHidden';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';

describe('inputHidden', () => {
  test('renders the input correctly', () => {
    expect.hasAssertions();

    render(
      <Form.Root>
        <Form.Field name="test">
          <InputHidden
            id="test"
            value=""
          />
        </Form.Field>
      </Form.Root>,
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });
});
