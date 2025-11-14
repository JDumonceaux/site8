import { getURLPath } from './helpers';

describe('getURLPath', () => {
  test('should return undefined for an empty URL', () => {
    expect.hasAssertions();

    const url = '';
    const expected = undefined;

    const result = getURLPath(url);

    expect(result).toEqual(expected);
  });

  test('should return an array of path segments for a non-empty URL', () => {
    expect.hasAssertions();

    const url = '/path/to/something';
    const expected = ['path', 'to', 'something'];

    const result = getURLPath(url);

    expect(result).toEqual(expected);
  });

  test('should ignore leading and trailing slashes in the URL', () => {
    expect.hasAssertions();

    const url = '/path/to/something/';
    const expected = ['path', 'to', 'something'];

    const result = getURLPath(url);

    expect(result).toEqual(expected);
  });

  test('should return undefined for a URL with only slashes', () => {
    expect.hasAssertions();

    const url = '////';
    const expected = undefined;

    const result = getURLPath(url);

    expect(result).toEqual(expected);
  });
});
