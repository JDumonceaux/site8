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
    dedupe: ['react', 'react-dom', 'react-router-dom'],
    alias: {
      '@app': '/src/app',
      '@components': '/src/components',
      '@content': '/src/content',
      '@features': '/src/features',
      '@hooks': '/src/hooks',
      '@lib': '/src/lib',
      '@providers': '/src/app/providers',
      '@store': '/src/store',
      '@styles': '/src/styles',
      '@types': '/src/types',
      components: '/src/components',
      content: '/src/content',
      features: '/src/features',
      hooks: '/src/hooks',
      lib: '/src/lib',
      providers: '/src/app/providers',
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
            // React must stay together to avoid multiple instances
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router')
            ) {
              return 'vendor-react';
            }
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
            if (id.includes('zod')) {
              return 'vendor-zod';
            }
            if (id.includes('date-fns')) {
              return 'vendor-date';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'vendor-redux';
            }
            // All other vendor code
            return 'vendor';
          }

          // Code split large feature modules
          if (id.includes('/src/features/')) {
            const featureName = id.split('/features/')[1]?.split('/')[0];
            if (featureName) {
              return `feature-${featureName}`;
            }
          }
        },
        // Optimize asset names for caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'styled-components',
    ],
    exclude: ['react-scan'],
  },
  preview: {
    port: 4173,
    strictPort: false,
    open: false,
  },
}));
