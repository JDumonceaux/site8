import { isValidArray } from './helpers';

describe('isValidArray', () => {
  test('should return true for a valid non-empty array', () => {
    expect.hasAssertions();

    const array = [1, 2, 3];

    const result = isValidArray(array);

    expect(result).toBe(true);
  });

  test('should return false for an empty array', () => {
    expect.hasAssertions();

    const array: unknown[] = [];

    const result = isValidArray(array);

    expect(result).toBe(false);
  });

  test('should return false for undefined', () => {
    expect.hasAssertions();

    const array = undefined;

    const result = isValidArray(array);

    expect(result).toBe(false);
  });

  test('should return false for null', () => {
    expect.hasAssertions();

    const array = null;

    const result = isValidArray(array);

    expect(result).toBe(false);
  });
});
