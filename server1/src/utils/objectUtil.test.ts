import {
  cleanUpData,
  getNextId,
  removeEmptyAttributes,
  sortObjectKeys,
  trimAttributes,
} from './objectUtil.js';

describe('removeEmptyAttributes', () => {
  it('should remove empty attributes from an object', () => {
    const obj = {
      name: 'John',
      age: 30,
      address: '',
      hobbies: [],
      email: null,
    };

    const result = removeEmptyAttributes(obj);

    expect(result).toEqual({
      name: 'John',
      age: 30,
    });
  });
});

describe('trimAttributes', () => {
  it('should trim string attributes of an object', () => {
    const obj = {
      name: '   John   ',
      age: 30,
      address: '   ',
      hobbies: ['   coding   ', '   reading   '],
    };

    const result = trimAttributes(obj);

    expect(result).toEqual({
      name: 'John',
      age: 30,
      address: '',
      hobbies: ['coding', 'reading'],
    });
  });
});

describe('sortObjectKeys', () => {
  it('should create a new object with sorted keys', () => {
    const obj = {
      b: 2,
      a: 1,
      c: 3,
    };

    const result = sortObjectKeys(obj);

    expect(result).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});

describe('cleanUpData', () => {
  it('should remove empty attributes, trim string attributes, and sort object keys', () => {
    const data = {
      id: 1,
      name: '   John   ',
      age: 30,
      address: '   ',
      hobbies: ['   coding   ', '   reading   '],
    };

    const result = cleanUpData(data);

    expect(result).toEqual({
      id: 1,
      name: 'John',
      age: 30,
      address: '',
      hobbies: ['coding', 'reading'],
    });
  });
});

describe('getNextId', () => {
  it('should return the next available id', () => {
    const items = [{ id: 1 }, { id: 3 }, { id: 2 }];

    const result = getNextId(items);

    expect(result).toBe(4);
  });

  it('should return undefined if items is undefined', () => {
    const items = undefined;

    const result = getNextId(items);

    expect(result).toBeUndefined();
  });
});
