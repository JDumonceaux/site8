const path = require('path');

export function getFilePath(fileName: string) {
  return path.resolve(__dirname, `../../data/${fileName}`);
}
