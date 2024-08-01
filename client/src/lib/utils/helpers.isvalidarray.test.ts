import { isValidArray } from './helpers';

describe('isValidArray', () => {
  test('should return true for a valid non-empty array', () => {
    const arr = [1, 2, 3];

    const result = isValidArray(arr);

    expect(result).toBe(true);
  });

  test('should return false for an empty array', () => {
    const arr: unknown[] = [];

    const result = isValidArray(arr);

    expect(result).toBe(false);
  });

  test('should return false for undefined', () => {
    const arr = undefined;

    const result = isValidArray(arr);

    expect(result).toBe(false);
  });

  test('should return false for null', () => {
    const arr = null;

    const result = isValidArray(arr);

    expect(result).toBe(false);
  });

  // test('should return false for a non-array value', () => {
  //   const arr = 'not an array';

  //   const result = isValidArray(arr);

  //   expect(result).toBe(false);
  // });
});
