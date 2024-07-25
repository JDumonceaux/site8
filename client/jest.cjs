const { defaults } = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
};
