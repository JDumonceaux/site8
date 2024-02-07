const path = require('path');
export function getFilePath(fileName) {
    return path.resolve(__dirname, `../../data/${fileName}`);
}
