import * as Form from '@radix-ui/react-form';
import { render, screen } from '@testing-library/react';
import InputImage from './InputImage';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';

describe('inputImage', () => {
  test('renders the input correctly', () => {
    expect.hasAssertions();

    render(
      <Form.Root>
        <Form.Field name="test">
          <InputImage id="test" />
        </Form.Field>
      </Form.Root>,
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });
});
