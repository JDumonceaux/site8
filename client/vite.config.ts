import react from '@vitejs/plugin-react';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const ReactCompilerConfig = {
  /* ... */
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    tsconfigPaths(),
    visualizer() as PluginOption,
  ],
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
