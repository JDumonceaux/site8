import { getSRC } from './helpers';

describe('getSRC', () => {
  test('should return the source URL for an image file', () => {
    expect.hasAssertions();

    const folder = 'images';
    const fileName = 'image.jpg';

    const result = getSRC(folder, fileName);

    expect(result).toBe('https://example.com/images/image.jpg');
  });

  test('should return undefined if fileName is empty', () => {
    expect.hasAssertions();

    const folder = 'images';
    const fileName = '';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });

  test('should return undefined if fileName is whitespace', () => {
    expect.hasAssertions();

    const folder = 'images';
    const fileName = '   ';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });

  test('should return undefined if folder is empty', () => {
    expect.hasAssertions();

    const folder = '';
    const fileName = 'image.jpg';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });

  test('should return undefined if folder is whitespace', () => {
    expect.hasAssertions();

    const folder = '   ';
    const fileName = 'image.jpg';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });

  test('should return undefined if both folder and fileName are empty', () => {
    expect.hasAssertions();

    const folder = '';
    const fileName = '';

    const result = getSRC(folder, fileName);

    expect(result).toBeUndefined();
  });
});
