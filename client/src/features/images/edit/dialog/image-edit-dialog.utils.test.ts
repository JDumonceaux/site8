import { describe, expect, test } from 'vitest';
import { validateEditForm } from './image-edit-dialog.utils';

const BASE_VALID_ARGS = {
  hasImage: true,
  isWorking: false,
  originalFileName: 'photo.jpg',
  targetFileName: 'photo.jpg',
  title: 'My Photo',
} as const;

describe('validateEditForm — title validation', () => {
  test('save is disabled when title is blank', () => {
    expect.assertions(1);

    const result = validateEditForm({ ...BASE_VALID_ARGS, title: '' });

    expect(result.isValid).toBe(false);
  });

  test('save is disabled when title is whitespace only', () => {
    expect.assertions(1);

    const result = validateEditForm({ ...BASE_VALID_ARGS, title: '   ' });

    expect(result.isValid).toBe(false);
  });

  test('save is enabled when title is present', () => {
    expect.assertions(1);

    const result = validateEditForm({ ...BASE_VALID_ARGS, title: 'My Photo' });

    expect(result.isValid).toBe(true);
  });

  test('hasValidationErrors is true when title is blank', () => {
    expect.assertions(1);

    const result = validateEditForm({ ...BASE_VALID_ARGS, title: '' });

    expect(result.hasValidationErrors).toBe(true);
  });
});

describe('validateEditForm — file extension validation', () => {
  test('save is disabled when extension is changed', () => {
    expect.assertions(1);

    const result = validateEditForm({
      ...BASE_VALID_ARGS,
      originalFileName: 'photo.jpg',
      targetFileName: 'photo.png',
    });

    expect(result.isValid).toBe(false);
  });

  test('extension change produces a warning message', () => {
    expect.assertions(1);

    const result = validateEditForm({
      ...BASE_VALID_ARGS,
      originalFileName: 'photo.jpg',
      targetFileName: 'photo.png',
    });

    expect(result.fileNameMessages?.warning).toBe(
      'File extension cannot be changed',
    );
  });

  test('save is enabled when only the base name changes', () => {
    expect.assertions(1);

    const result = validateEditForm({
      ...BASE_VALID_ARGS,
      originalFileName: 'photo.jpg',
      targetFileName: 'new_name.jpg',
    });

    expect(result.isValid).toBe(true);
  });

  test('extension comparison is case-insensitive', () => {
    expect.assertions(1);

    const result = validateEditForm({
      ...BASE_VALID_ARGS,
      originalFileName: 'photo.JPG',
      targetFileName: 'photo.jpg',
    });

    expect(result.isValid).toBe(true);
  });

  test('no warning message when extension is unchanged', () => {
    expect.assertions(1);

    const result = validateEditForm({
      ...BASE_VALID_ARGS,
      originalFileName: 'photo.jpg',
      targetFileName: 'renamed.jpg',
    });

    expect(result.fileNameMessages).toBeUndefined();
  });

  test('blank filename does not trigger extension-change error', () => {
    expect.assertions(2);

    const result = validateEditForm({
      ...BASE_VALID_ARGS,
      originalFileName: 'photo.jpg',
      targetFileName: '',
    });

    expect(result.fileNameMessages).toBeUndefined();
    expect(result.isValid).toBe(true);
  });
});
