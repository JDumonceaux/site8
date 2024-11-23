import { terser } from 'rollup-plugin-terser';

export default {
  build: {
    hash: true,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          ui: ['@radix-ui/react-icons', '@radix-ui/react-tooltip'],
          vendor: ['react', 'react-dom']
        }
      }
    },
  },
  dest: 'dist/main.min.js',
  entry: 'src/scripts/main.js',
  format: 'iife',
  // minifier
  plugins: [terser()],
  sourceMap: 'inline',
  treeshake: true,
};
