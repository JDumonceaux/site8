import { getFilePath } from './getFilePath.js';
describe('getFilePath', () => {
    it('should return the correct file path', () => {
        const fileName = 'example.txt';
        const expectedFilePath = '/c:/Users/jdumo/Documents/0Projects/site8/data/example.txt';
        const filePath = getFilePath(fileName);
        expect(filePath).toBe(expectedFilePath);
    });
});
