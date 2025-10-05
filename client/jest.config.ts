/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';

const config: Config = {
  // Use ts-jest preset for TypeScript support
  preset: 'ts-jest',
  // Simulate a browser-like environment for testing
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.maestro/',
    '@react-native',
  ],
  // Uncomment the lines below to set up global test configurations if needed
  // setupFiles: ['<rootDir>/test/setup.ts'],
  // setupFilesAfterEnv: ['<rootDir>/jest-setup-after-env.js'],

  // Optional: Enable code coverage collection
  // collectCoverage: true,
  // coverageDirectory: '<rootDir>/coverage/',

  // Optional: Map static assets (e.g., CSS) to a proxy during tests
  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  // },
};

export default config;
