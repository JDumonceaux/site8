import { isValidArray } from './helpers';

describe('isValidArray', () => {
  test('should return true for a valid non-empty array', () => {
    const array = [1, 2, 3];

    const result = isValidArray(array);

    expect(result).toBe(true);
  });

  test('should return false for an empty array', () => {
    const array: unknown[] = [];

    const result = isValidArray(array);

    expect(result).toBe(false);
  });

  test('should return false for undefined', () => {
    const array = undefined;

    const result = isValidArray(array);

    expect(result).toBe(false);
  });

  test('should return false for null', () => {
    const array = null;

    const result = isValidArray(array);

    expect(result).toBe(false);
  });

  // test('should return false for a non-array value', () => {
  //   const arr = 'not an array';

  //   const result = isValidArray(arr);

  //   expect(result).toBe(false);
  // });
});
