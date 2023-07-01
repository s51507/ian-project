import { fileURLToPath, URL } from 'url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import requireTransform from 'vite-plugin-require-transform'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ian-project/',
  server: {
    port: 48763,
  },
  build: {
    outDir: path.join(__dirname, 'dist')
  },
  plugins: [
    vue(),
    vueJsx(),
    // requireTransform.default({
    //   fileRegex: /.ts$|.js$|.vue$/
    // })
  ],
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@img': path.resolve(__dirname, `src/assets/img`),
      '@font': path.resolve(__dirname, `src/assets/font`),
      '@svgicons': path.resolve(__dirname, `src/assets/svgicons`),
      '@components': path.resolve(__dirname, `src/components`),
      '@theme': path.join(__dirname, `src/theme`)
    }
  }
})
