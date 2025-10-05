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
    assetsDir: 'assets', // unchanged
    sourcemap: false, // unchanged (set true for debugging if needed)
    minify: 'esbuild', // unchanged
    target: 'es2022', // unchanged
    rollupOptions: {
      output: {
        manualChunks(id) {
          return undefined; // Intentionally let Vite handle chunking for non-vendor modules
          return undefined; // ADDED: explicit for clarity
        },
      },
    },
  },
  // Uncomment the block below to enable Vitest configuration for unit testing:
  // test: { globals: true, environment: 'jsdom', watch: false },
});
