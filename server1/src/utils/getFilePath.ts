import path from 'path';

export function getFilePath(fileName: string) {
  return path.resolve(__dirname, `../../data/${fileName}`);
}
