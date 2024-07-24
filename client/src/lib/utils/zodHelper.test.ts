import { z } from 'zod';
import { safeParse } from './zodHelper';

type SafeParseProps<T> = {
  success: boolean;
  data: T | null;
  error: z.ZodError<T> | null;
  formattedError: z.ZodFormattedError<T> | null;
};

describe('safeParse', () => {
  it('should return the parsing result with success=true and data=null when input data is valid', () => {
    // Arrange
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const inputData = {
      name: 'John',
      age: 30,
    };

    // Act
    const result = safeParse(schema, inputData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toBeNull();
    expect(result.error).toBeNull();
    expect(result.formattedError).toBeNull();
  });

  // it('should return the parsing result with success=false and error=null when input data is invalid', () => {
  //   // Arrange
  //   const schema = z.object({
  //     name: z.string(),
  //     age: z.number(),
  //   });

  //   const inputData = {
  //     name: 'John',
  //     age: '30', // Invalid type
  //   };

  //   // Act
  //   const result = safeParse(schema, inputData);

  //   // Assert
  //   expect(result.success).toBe(false);
  //   expect(result.data).toBeNull();
  //   expect(result.error).not.toBeNull();
  //   expect(result.formattedError).not.toBeNull();
  // });
});
