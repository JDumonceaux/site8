import { terser } from '@rollup/plugin-terser';

export default {
  // Entry point of your application
  input: 'src/scripts/main.js',

  // Output configuration
  output: {
    file: 'dist/main.min.js',
    format: 'iife',
    // Note: manualChunks is typically used with code-splitting (e.g. output.format === 'esm').
    // For IIFE format, code-splitting isn't supported, but this is kept for demonstration purposes.
    manualChunks: {
      ui: ['@radix-ui/react-icons', '@radix-ui/react-tooltip'],
      vendor: ['react', 'react-dom'],
    },
    sourcemap: 'inline',
  },

  // Plugins
  plugins: [
    terser(), // Minify the bundle using terser
  ],

  // Enable tree shaking for optimal bundle size
  treeshake: true,
};
