/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers'
import path from 'path';
import fs from 'fs'
import Unocss from 'unocss/vite';
import transformerDirective from '@unocss/transformer-directives'

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
    Unocss({
      transformers: [
        transformerDirective(),
      ],
    }),
    Components({
      dts: 'src/components.d.ts',
      deep: true,
      extensions: ['vue', 'ts'],
      directoryAsNamespace: true,
      resolvers: [
        VantResolver(),
      ],
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }),
  ],
});
