/**
 * Babel Configuration
 * 
 * Transpiles modern JavaScript/TypeScript for Node.js and test environments.
 * This configuration is primarily used for Jest testing.
 * 
 * Note: Vite handles build transpilation, so this config is mainly for Node.js tooling.
 * 
 * @type {import("@babel/core").TransformOptions}
 */
module.exports = {
  // Comments to include in output
  comments: false,

  // ----------------------------------------------------------------------------
  // Environment-Specific Overrides
  // ----------------------------------------------------------------------------
  env: {
    // Production optimizations
    production: {
      plugins: [
        // Remove console statements in production
        // ['transform-remove-console', { exclude: ['error', 'warn'] }],

        // Remove React propTypes in production
        // 'transform-react-remove-prop-types',
      ],
    },
    // Test environment configuration (Jest)
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            // Transform modules to CommonJS for Jest
            modules: 'commonjs',
            targets: { node: 'current' },
          },
        ],
      ],
    },
  },

  // ----------------------------------------------------------------------------
  // Additional Options
  // ----------------------------------------------------------------------------
  // Only transpile source files, ignore node_modules
  ignore: ['node_modules'],

  // ----------------------------------------------------------------------------
  // Plugins - Applied left-to-right
  // ----------------------------------------------------------------------------
  plugins: [
    // Enable class properties with loose mode for smaller output
    ['@babel/plugin-proposal-class-properties', { loose: true }],

    // Enable private methods in classes
    ['@babel/plugin-proposal-private-methods', { loose: true }],

    // Reuse Babel's helper code to reduce duplication
    [
      '@babel/plugin-transform-runtime',
      {
        // Use corejs for polyfills if needed
        corejs: false,
        // Optimize helper usage
        helpers: true,
        // Enable async/await support
        regenerator: true,
        // Use ESM version of runtime helpers
        useESModules: false,
      },
    ],

    // Optional: Decorator support (experimental)
    // Uncomment if using decorators in your codebase
    // ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
  ],

  // ----------------------------------------------------------------------------
  // Presets - Applied right-to-left
  // ----------------------------------------------------------------------------
  presets: [
    [
      '@babel/preset-env',
      {
        // Use smaller, faster transforms when possible
        loose: true,
        // Only include necessary polyfills/transforms
        modules: 'auto',
        // Target current Node.js version for optimal compatibility
        targets: { node: 'current' },
        // Don't transform modules for Jest (it expects CommonJS)
        // Set to false if using native ESM in Jest
        useBuiltIns: false,
      },
    ],
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,
        // Allow TypeScript JSX syntax (TSX files)
        isTSX: true,
        // Optimize by skipping type checking (TypeScript compiler handles this)
        onlyRemoveTypeImports: true,
      },
    ],
    // Add React preset if using JSX/TSX
    [
      '@babel/preset-react',
      {
        // Enable development mode helpers in non-production
        development: process.env.NODE_ENV !== 'production',
        // Use automatic JSX runtime (React 17+, no need to import React)
        runtime: 'automatic',
      },
    ],
  ],

  // Retain line numbers for easier debugging
  retainLines: false,

  // Source maps for better debugging
  sourceMaps: true,
};
