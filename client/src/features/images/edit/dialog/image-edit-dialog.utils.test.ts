import { describe, expect, test } from 'vitest';
import {
  getFileNameFromSource,
  getFolderLabelFromSource,
  toSuggestedFileName,
  validateEditForm,
} from './image-edit-dialog.utils';

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

// ---------------------------------------------------------------------------
// getFileNameFromSource
// ---------------------------------------------------------------------------

describe('getFileNameFromSource', () => {
  test('returns filename from a nested path', () => {
    expect.assertions(1);

    expect(getFileNameFromSource('/images/2025/memes/img_7020.png')).toBe(
      'img_7020.png',
    );
  });

  test('returns filename from a root-level path', () => {
    expect.assertions(1);

    expect(getFileNameFromSource('/images/photo.jpg')).toBe('photo.jpg');
  });

  test('returns empty string for empty source', () => {
    expect.assertions(1);

    expect(getFileNameFromSource('')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// getFolderLabelFromSource
// ---------------------------------------------------------------------------

describe('getFolderLabelFromSource', () => {
  test('returns folder path for a nested image', () => {
    expect.assertions(1);

    expect(getFolderLabelFromSource('/images/2025/memes/img_7020.png')).toBe(
      '2025/memes',
    );
  });

  test('returns Root for a top-level image (no subfolder)', () => {
    expect.assertions(1);

    expect(getFolderLabelFromSource('/images/photo.jpg')).toBe('Root');
  });

  test('returns Root when source does not start with image base', () => {
    expect.assertions(1);

    expect(getFolderLabelFromSource('/other/path/photo.jpg')).toBe('Root');
  });

  test('returns Root for empty source', () => {
    expect.assertions(1);

    expect(getFolderLabelFromSource('')).toBe('Root');
  });

  test('returns single folder for one level deep', () => {
    expect.assertions(1);

    expect(getFolderLabelFromSource('/images/memes/img_7020.png')).toBe(
      'memes',
    );
  });

  test('returns full path for three-level nesting', () => {
    expect.assertions(1);

    expect(getFolderLabelFromSource('/images/2025/art/paintings/img.jpg')).toBe(
      '2025/art/paintings',
    );
  });
});

// ---------------------------------------------------------------------------
// toSuggestedFileName
// ---------------------------------------------------------------------------

describe('toSuggestedFileName', () => {
  test('converts title to lowercase snake_case with original extension', () => {
    expect.assertions(1);

    expect(toSuggestedFileName('My Meme Photo', 'img_7020.png')).toBe(
      'my_meme_photo.png',
    );
  });

  test('preserves extension from current filename', () => {
    expect.assertions(1);

    expect(toSuggestedFileName('Baroque Palace', 'gallery.jpg')).toBe(
      'baroque_palace.jpg',
    );
  });

  test('collapses multiple spaces into single underscore', () => {
    expect.assertions(1);

    expect(toSuggestedFileName('A  B   C', 'photo.jpg')).toBe('a_b_c.jpg');
  });

  test('trims leading and trailing whitespace from title', () => {
    expect.assertions(1);

    expect(toSuggestedFileName('  my photo  ', 'img.png')).toBe('my_photo.png');
  });
});
