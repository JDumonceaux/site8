import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteTsConfigPaths(), visualizer() as PluginOption],
  // Allow absolute imports from the `src` directory
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
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
});
