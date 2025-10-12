import {
  cleanUpData,
  getDefaultObject,
  getNextId,
  getNextIdFromPos,
  removeEmptyAttributes,
  sortObjectKeys,
  trimAttributes,
} from './objectUtil.js';

describe('getDefaultObject', () => {
  test('should return object with default values for each type', () => {
    const obj = {
      name: 'John',
      age: 30,
      active: true,
      tags: ['tag1'],
      meta: { key: 'value' },
    };

    const result = getDefaultObject(obj);

    expect(result).toEqual({
      name: '',
      age: 0,
      active: false,
      tags: [],
      meta: {},
    });
  });

  test('should handle empty object', () => {
    const result = getDefaultObject({});
    expect(result).toEqual({});
  });
});

describe('removeEmptyAttributes', () => {
  test('should remove empty strings', () => {
    const obj = {
      name: 'John',
      address: '',
    };

    const result = removeEmptyAttributes(obj);

    expect(result).toEqual({
      name: 'John',
    });
  });

  test('should remove empty arrays', () => {
    const obj = {
      name: 'John',
      hobbies: [],
    };

    const result = removeEmptyAttributes(obj);

    expect(result).toEqual({
      name: 'John',
    });
  });

  test('should remove null values', () => {
    const obj = {
      name: 'John',
      email: null,
    };

    const result = removeEmptyAttributes(obj);

    expect(result).toEqual({
      name: 'John',
    });
  });

  test('should remove whitespace-only strings', () => {
    const obj = {
      name: 'John',
      address: '   ',
    };

    const result = removeEmptyAttributes(obj);

    expect(result).toEqual({
      name: 'John',
    });
  });

  test('should keep zero values', () => {
    const obj = {
      name: 'John',
      age: 0,
    };

    const result = removeEmptyAttributes(obj);

    expect(result).toEqual({
      name: 'John',
      age: 0,
    });
  });

  test('should keep false values', () => {




























































































































































































});  });    expect(result).toEqual({ value: 1, index: 0 });    const result = getNextIdFromPos(items, 5);    const items = [{ id: 1 }, { id: 2 }];  test('should handle start position beyond array length', () => {  });    expect(result).toBeUndefined();    const result = getNextIdFromPos(undefined, 0);  test('should return undefined for undefined input', () => {  });    expect(result).toBeUndefined();    const result = getNextIdFromPos([], 0);  test('should return undefined for empty array', () => {  });    expect(result).toEqual({ value: 4, index: 0 });    const result = getNextIdFromPos(items, 1);    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];  test('should return next id from specified position', () => {describe('getNextIdFromPos', () => {});  });    expect(result).toBe(2);    const result = getNextId(items);    const items = [{ id: 1 }];  test('should return 2 when only id 1 exists', () => {  });    expect(result).toBeUndefined();    const result = getNextId(undefined);  test('should return undefined for undefined input', () => {  });    expect(result).toBeUndefined();    const result = getNextId([]);  test('should return undefined for empty array', () => {  });    expect(result).toBe(4);    const result = getNextId(items);    const items = [{ id: 3 }, { id: 1 }, { id: 2 }];  test('should handle unsorted items', () => {  });    expect(result).toBe(2);    const result = getNextId(items);    const items = [{ id: 1 }, { id: 3 }, { id: 4 }];  test('should return first missing id in sequence', () => {  });    expect(result).toBe(4);    const result = getNextId(items);    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];  test('should return next sequential id when all ids are contiguous', () => {describe('getNextId', () => {});  });    expect(result).toEqual({});    const result = cleanUpData({});  test('should handle empty object', () => {  });    expect(Object.keys(result)[0]).toBe('id');    const result = cleanUpData(data);    };      age: 30,      id: 1,      name: 'John',    const data = {  test('should move id to first position if present', () => {  });    });      name: 'John',      city: 'NYC',      age: 30,    expect(result).toEqual({    const result = cleanUpData(data);    };      city: 'NYC',      address: '   ',      age: 30,      name: '   John   ',    const data = {  test('should combine remove empty, trim, and sort operations', () => {describe('cleanUpData', () => {});  });    expect(result).toEqual({ name: 'John' });    const result = sortObjectKeys(obj);    const obj = { name: 'John' };  test('should handle single key', () => {  });    expect(result).toEqual({});    const result = sortObjectKeys({});  test('should handle empty object', () => {  });    });      c: 3,      b: 2,      a: 1,    expect(result).toEqual({    expect(Object.keys(result)).toEqual(['a', 'b', 'c']);    const result = sortObjectKeys(obj);    };      b: 2,      a: 1,      c: 3,    const obj = {  test('should sort keys alphabetically', () => {describe('sortObjectKeys', () => {});  });    });      tags: ['tag1', 'tag2'],      active: true,      age: 30,      name: 'John',    expect(result).toEqual({    const result = trimAttributes(obj);    };      tags: ['tag1', 'tag2'],      active: true,      age: 30,      name: 'John',    const obj = {  test('should not modify non-string values', () => {  });    });      age: 30,      name: '',    expect(result).toEqual({    const result = trimAttributes(obj);    };      age: 30,      name: '   ',    const obj = {  test('should trim whitespace-only strings to empty', () => {  });    });      age: 30,      name: 'John',    expect(result).toEqual({    const result = trimAttributes(obj);    };      age: 30,      name: '   John   ',    const obj = {  test('should trim string attributes', () => {describe('trimAttributes', () => {});  });    });      active: false,      name: 'John',    expect(result).toEqual({    const result = removeEmptyAttributes(obj);    };      active: false,      name: 'John',    const obj = {    expect(result).to