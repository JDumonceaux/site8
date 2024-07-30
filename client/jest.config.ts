/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';
import { defaults } from 'ts-jest/presets';

const config: Config = {
  ...defaults,
  preset: 'ts-jest',
  transform: { '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest' },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.maestro/',
    '@react-native',
  ],
  // setupFiles: ['<rootDir>/test/setup.ts'],
  // setupFilesAfterEnv: ['<rootDir>/jest-setup-after-env.js'],
};

export default config;
