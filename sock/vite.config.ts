import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    publicDir: 'static',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api/intraday': {
          target: 'http://qa-test.qcoral.tech',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/intraday/, '/stock/getStockIntraday'),
        },
        '/api/daily': {
          target: 'http://qa-test.qcoral.tech',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/daily/, '/stock/getStockDaily'),
          configure: (proxy) => {
            proxy.on('proxyReq', (_proxyReq, req) => {
              console.log(`[daily] request ${req.method || 'GET'} ${req.url || ''}`);
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log(`[daily] response ${proxyRes.statusCode || 500} ${req.method || 'GET'} ${req.url || ''}`);
            });
          },
        },
        '/api/news-index': {
          target: 'https://ai.qcoral.tech',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api\/news-index/, '/news/indexNew'),
        },
      },
    },
  };
});
