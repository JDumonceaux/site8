import { describe, expect, it } from 'vitest';
import {
  hasItems,
  isDefined,
  isEmpty,
  isNonEmptyString,
  isNonZero,
  isPositive,
} from './boolean-checks';

describe('boolean-checks', () => {
  describe('isNonEmptyString', () => {
    it('returns true for non-empty strings', () => {
      expect(isNonEmptyString('hello')).toBe(true);
      expect(isNonEmptyString(' ')).toBe(true);
      expect(isNonEmptyString('0')).toBe(true);
    });

    it('returns false for empty strings', () => {
      expect(isNonEmptyString('')).toBe(false);
    });

    it('returns false for null or undefined', () => {
      expect(isNonEmptyString(null)).toBe(false);
      expect(isNonEmptyString(undefined)).toBe(false);
    });
  });

  describe('isNonZero', () => {
    it('returns true for non-zero numbers', () => {
      expect(isNonZero(1)).toBe(true);
      expect(isNonZero(-1)).toBe(true);
      expect(isNonZero(0.1)).toBe(true);
      expect(isNonZero(Number.MAX_VALUE)).toBe(true);
    });

    it('returns false for zero', () => {
      expect(isNonZero(0)).toBe(false);
      expect(isNonZero(-0)).toBe(false);
    });

    it('returns false for null or undefined', () => {
      expect(isNonZero(null)).toBe(false);
      expect(isNonZero(undefined)).toBe(false);
    });
  });

  describe('isPositive', () => {
    it('returns true for positive numbers', () => {
      expect(isPositive(1)).toBe(true);
      expect(isPositive(0.1)).toBe(true);
      expect(isPositive(Number.MAX_VALUE)).toBe(true);
    });

    it('returns false for zero', () => {
      expect(isPositive(0)).toBe(false);
      expect(isPositive(-0)).toBe(false);
    });

    it('returns false for negative numbers', () => {
      expect(isPositive(-1)).toBe(false);
      expect(isPositive(-0.1)).toBe(false);
    });

    it('returns false for null or undefined', () => {
      expect(isPositive(null)).toBe(false);
      expect(isPositive(undefined)).toBe(false);
    });
  });

  describe('isDefined', () => {
    it('returns true for any defined value', () => {
      expect(isDefined('')).toBe(true);
      expect(isDefined(0)).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined([])).toBe(true);
      expect(isDefined({})).toBe(true);
    });

    it('returns false for null or undefined', () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe('hasItems', () => {
    it('returns true for non-empty arrays', () => {
      expect(hasItems([1])).toBe(true);
      expect(hasItems([1, 2, 3])).toBe(true);
      expect(hasItems(['a'])).toBe(true);
    });

    it('returns false for empty arrays', () => {
      expect(hasItems([])).toBe(false);
    });

    it('returns false for null or undefined', () => {
      expect(hasItems(null)).toBe(false);
      expect(hasItems(undefined)).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('returns true for empty strings', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('returns true for empty arrays', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('returns true for null or undefined', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('returns false for non-empty strings', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(' ')).toBe(false);
    });

    it('returns false for non-empty arrays', () => {
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty([1, 2])).toBe(false);
    });
  });
});
