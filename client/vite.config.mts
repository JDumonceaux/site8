import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsConfigPaths(), visualizer() as PluginOption],
  // Allow absolute imports from the `src` directory
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      feature: '/src/feature',
      hooks: '/src/hooks',
      lib: '/src/lib',
      providers: '/src/providers',
      store: '/src/store',
      styles: '/src/styles',
      types: '/src/types',
    },
  },
  build: {
    sourcemap: false,
    assetsDir: '',
    outDir: 'dist',
    minify: true,
    rollupOptions: {
      plugins: [analyze()],
    },
  },
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   watch: false,
  // },
});
