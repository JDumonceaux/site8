import { defineConfig, type Plugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { analyzer } from 'vite-bundle-analyzer';

// Vite 7.1.9 validated - CHANGED: Updated to use vite-bundle-analyzer instead of rollup-plugin-analyzer
const analyzePlugin: Plugin | undefined =
  process.env.ANALYZE === 'true'
    ? analyzer({
        analyzerMode: 'static', // ADDED: Required for vite-bundle-analyzer
        openAnalyzer: false, // ADDED: Prevents auto-opening browser
      })
    : undefined;

export default defineConfig({
  plugins: [
    tsConfigPaths(), // unchanged
    analyzePlugin, // CHANGED: extracted & typed for clarity
    // The type guard below ensures only valid plugins are included, avoiding undefined values in the plugins array.
  ].filter((p): p is Plugin => !!p), // CHANGED: typed filter instead of Boolean
  resolve: {
    alias: {
      '@app': '/src/app',
      '@components': '/src/components',
      '@content': '/src/content',
      '@features': '/src/features',
      '@hooks': '/src/hooks',
      '@lib': '/src/lib',
      '@providers': '/src/providers',
      '@store': '/src/store',
      '@styles': '/src/styles',
      '@types': '/src/types',
      '@unused': '/src/unused',
      components: '/src/components',
      content: '/src/content',
      features: '/src/features',
      hooks: '/src/hooks',
      lib: '/src/lib',
      providers: '/src/providers',
      store: '/src/store',
      styles: '/src/styles',
      types: '/src/types',
      src: '/src',
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunking for better caching
          if (id.includes('node_modules')) {
            // Large libraries get their own chunks
            if (id.includes('@aws-amplify')) {
              return 'vendor-amplify';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-react-query';
            }
            if (id.includes('styled-components')) {
              return 'vendor-styled';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // All other vendor code
            return 'vendor';
          }
        },
      },
    },
  },
  // Uncomment the block below to enable Vitest configuration for unit testing:
  // test: { globals: true, environment: 'jsdom', watch: false },
});
