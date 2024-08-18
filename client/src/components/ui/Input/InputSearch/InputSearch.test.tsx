import * as Form from '@radix-ui/react-form';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import InputSearch from './InputSearch';
describe('InputSearch', () => {
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

  test('input value changes on user input', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputSearch id="test" />
        </Form.Field>
      </Form.Root>,
    );
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    expect(inputElement).toHaveValue('Hello');
  });

  // test('submits the correct value', () => {
  //   const handleSubmit = jest.fn();
  //   render(
  //     <Form.Root>
  //       <Form.Field name="test">
  //         <InputSearch id="test" />
  //       </Form.Field>
  //       <button onClick={handleSubmit}>Submit</button>
  //     </Form.Root>,
  //   );
  //   const inputElement = screen.getByRole('textbox');
  //   fireEvent.change(inputElement, { target: { value: 'Hello' } });
  //   const submitButton = screen.getByText('Submit');
  //   fireEvent.click(submitButton);
  //   expect(handleSubmit).toHaveBeenCalledWith('Hello');
  // });

  // Required
  test('shows validation message on invalid input', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputSearch id="test" required />
        </Form.Field>
        <button type="button">Submit</button>
      </Form.Root>,
    );
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
  });

  // MinLength
  test('shows validation message on invalid input', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputSearch id="test" minLength={5} />
        </Form.Field>
        <button type="button">Submit</button>
      </Form.Root>,
    );
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText('Must be at least 5 characters');
    expect(errorMessage).toBeInTheDocument();
  });

  // MaxLength
  test('shows validation message on invalid input', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputSearch id="test" maxLength={5} />
        </Form.Field>
        <button type="button">Submit</button>
      </Form.Root>,
    );
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText('Must be at most 5 characters');
    expect(errorMessage).toBeInTheDocument();
  });

  // Pattern
  test('shows validation message on invalid input', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputSearch id="test" pattern="^[a-zA-Z]*$" />
        </Form.Field>
        <button type="button">Submit</button>
      </Form.Root>,
    );
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText('Invalid format');
    expect(errorMessage).toBeInTheDocument();
  });

  // Focus
  // test('handles focus and blur events', () => {
  //   render(<InputSearch id="test" />);
  //   const inputElement = screen.getByRole('textbox');
  //   fireEvent.focus(inputElement);
  //   expect(inputElement).toHaveFocus();
  // });

  // Blur
  // test('handles focus and blur events', () => {
  //   render(<InputSearch id="test" />);
  //   const inputElement = screen.getByRole('textbox');
  //   fireEvent.focus(inputElement);
  //   expect(inputElement).toHaveFocus();
  //   fireEvent.blur(inputElement);
  //   expect(inputElement).not.toHaveFocus();
  // });

  test('apply different styles when input is focused', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputSearch id="test" />
        </Form.Field>
      </Form.Root>,
    );

    const inputElement = screen.getByRole('textbox');

    // Initially check for default style
    expect(inputElement).toHaveStyle('border-color: #ccc');

    // Simulate focus
    fireEvent.focus(inputElement);
    expect(inputElement).toHaveStyle('border-color: blue'); // Replace with the expected style when focused

    // Simulate blur
    fireEvent.blur(inputElement);
    expect(inputElement).toHaveStyle('border-color: #ccc'); // Back to default style
  });

  test('applies error style when input is invalid', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputSearch id="test" required />
        </Form.Field>
      </Form.Root>,
    );
    const inputElement = screen.getByRole('textbox');
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    expect(inputElement).toHaveStyle('border-color: red');
  });
});
