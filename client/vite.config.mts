import analyze from 'rollup-plugin-analyzer';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsConfigPaths()],
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
      // if you still want a `src/` import, keep that as well
      src: '/src',
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: '',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      plugins: [analyze()],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('/src/')) return 'components';
        },
      },
    },
  },
  // If you decide to re-enable Vitest:
  // test: {
  //   globals:     true,
  //   environment: 'jsdom',
  //   watch:       false,
  // },
});
