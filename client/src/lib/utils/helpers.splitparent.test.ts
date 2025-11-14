import { splitParent } from './helpers';

describe('splitParent', () => {
  test('should return an array of objects for a valid input string', () => {
    expect.hasAssertions();

    const input = '1,2,3,4,5,6';
    const expected = [
      { id: 1, seq: 2 },
      { id: 3, seq: 4 },
      { id: 5, seq: 6 },
    ];

    const result = splitParent(input);

    expect(result).toEqual(expected);
  });

  test('should return undefined for an empty input string', () => {
    expect.hasAssertions();

    const input = '';
    const expected = undefined;

    const result = splitParent(input);

    expect(result).toEqual(expected);
  });

  test('should return undefined for an input string with odd number of values', () => {
    expect.hasAssertions();

    const input = '1,2,3';
    const expected = undefined;

    const result = splitParent(input);

    expect(result).toEqual(expected);
  });

  test('should return undefined for an input string with non-numeric values', () => {
    expect.hasAssertions();

    const input = '1,2,3,4,5,a,6';
    const expected = undefined;

    const result = splitParent(input);

    expect(result).toEqual(expected);
  });

  test('should return undefined for undefined input', () => {
    expect.hasAssertions();

    const input = undefined;
    const expected = undefined;

    const result = splitParent(input);

    expect(result).toEqual(expected);
  });
});
