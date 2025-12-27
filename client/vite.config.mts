import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { analyzer } from 'vite-bundle-analyzer';

// Using vite-bundle-analyzer for bundle analysis
const analyzePlugin: Plugin | undefined =
  process.env.ANALYZE === 'true'
    ? analyzer({
        analyzerMode: 'static',
        openAnalyzer: false,
      })
    : undefined;

export default defineConfig(({ mode }) => ({
  plugins: [react(), tsConfigPaths(), analyzePlugin].filter(
    (p): p is Plugin => !!p,
  ),
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
    sourcemap: mode === 'development',
    minify: 'esbuild',
    target: 'es2024',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
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
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['react-scan'],
  },
  preview: {
    port: 4173,
    strictPort: false,
    open: false,
  },
}));
