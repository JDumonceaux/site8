import { describe, expect, test } from 'vitest';
import { getURLPath } from './helpers';

describe('getURLPath', () => {
  test('should return undefined for an empty URL', () => {
    const url = '';
    const expected = undefined;

    const result = getURLPath(url);

    expect(result).toEqual(expected);
  });

  test('should return an array of path segments for a non-empty URL', () => {
    const url = '/path/to/something';
    const expected = ['path', 'to', 'something'];

    const result = getURLPath(url);

    expect(result).toEqual(expected);
  });

  test('should ignore leading and trailing slashes in the URL', () => {
    const url = '/path/to/something/';
    const expected = ['path', 'to', 'something'];

    const result = getURLPath(url);

    expect(result).toEqual(expected);
  });

  test('should return undefined for a URL with only slashes', () => {
    const url = '////';
    const expected = undefined;

    const result = getURLPath(url);

    expect(result).toEqual(expected);
  });
});
