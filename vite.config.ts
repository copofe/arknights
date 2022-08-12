/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import path from 'path';
import fs from 'fs'
import Unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '::': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost-cert.pem')
    },
  },
  plugins: [
    vue(),
    Unocss(),
    Components({
      dts: 'src/components.d.ts',
      deep: true,
      extensions: ['vue', 'ts'],
      directoryAsNamespace: true,
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }),
  ],
});
