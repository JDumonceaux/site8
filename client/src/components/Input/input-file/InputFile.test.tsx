import * as Form from '@radix-ui/react-form';
import { render, screen } from '@testing-library/react';
import InputFile from './InputFile';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';

describe('inputFile', () => {
  test('renders the input correctly', () => {
    expect.hasAssertions();

    render(
      <Form.Root>
        <Form.Field name="test">
          <InputFile
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
