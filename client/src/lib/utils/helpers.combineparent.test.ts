import { combineParent } from './helpers';

describe('combineParent', () => {
  test('should return "0,0" for an empty input array', () => {
    const input: { id?: number; seq?: number }[] = [];
    const expected = '0,0';

    const result = combineParent(input);

    expect(result).toEqual(expected);
  });

  test('should return "1,2,3,4,5,6" for a valid input array', () => {
    const input = [
      { id: 1, seq: 2 },
      { id: 3, seq: 4 },
      { id: 5, seq: 6 },
    ];
    const expected = '1,2,3,4,5,6';

    const result = combineParent(input);

    expect(result).toEqual(expected);
  });

  test('should return "1,2,3,4" for an input array with undefined values', () => {
    const input = [
      { id: 1, seq: 2 },
      { id: undefined, seq: 4 },
      { id: 3, seq: undefined },
      { id: undefined, seq: undefined },
    ];
    const expected = '1,2,3,4';

    const result = combineParent(input);

    expect(result).toEqual(expected);
  });

  test('should return "0,0" for an undefined input', () => {
    const input = undefined;
    const expected = '0,0';

    const result = combineParent(input);

    expect(result).toEqual(expected);
  });
});
