import path from 'path';
export function getFilePath(fileName) {
    return path.resolve(__dirname, `../../data/${fileName}`);
}