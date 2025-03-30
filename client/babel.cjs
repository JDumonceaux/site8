/** @type {import("@babel/core").TransformOptions} */
module.exports = {
  presets: [
    // Transpile modern JavaScript based on the current Node version.
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // Enable TypeScript support.
    '@babel/preset-typescript',
  ],
  plugins: [
    // Enable support for class properties (with "loose" mode for smaller output)
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // Reuse Babel's injected helper code to reduce bundle size
    ['@babel/plugin-transform-runtime', { regenerator: true }],
    // Uncomment the following if you need decorator support (experimental)
    // ['@babel/plugin-proposal-decorators', { legacy: true }],
    // Optional: Add support for object rest/spread if not already handled by preset-env
    // '@babel/plugin-proposal-object-rest-spread',
  ],
};
