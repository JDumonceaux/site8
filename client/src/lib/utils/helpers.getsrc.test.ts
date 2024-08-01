import { getSRC } from './helpers';

describe('getSRC', () => {
  test('should return the source URL for an image file', () => {
    const folder = 'images';
    const fileName = 'image.jpg';

    const result = getSRC(folder, fileName);

    expect(result).toBe('https://example.com/images/image.jpg');
  });

  test('should return undefined if fileName is empty', () => {
    const folder = 'images';
    const fileName = '';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });

  test('should return undefined if fileName is whitespace', () => {
    const folder = 'images';
    const fileName = '   ';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });

  test('should return undefined if folder is empty', () => {
    const folder = '';
    const fileName = 'image.jpg';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });

  test('should return undefined if folder is whitespace', () => {
    const folder = '   ';
    const fileName = 'image.jpg';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });

  test('should return undefined if both folder and fileName are empty', () => {
    const folder = '';
    const fileName = '';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });
});
