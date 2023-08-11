import path from 'path'
import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import rollupAlias from '@rollup/plugin-alias'
// import requireTransform from 'vite-plugin-require-transform'

import packageJson from './package.json';
const PACKAGE = JSON.stringify(packageJson)

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const __isProd = process.env.NODE_ENV === "production"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, path.resolve(__dirname, 'env'), ['VITE_', 'MY_', 'YOUR_'])

  console.log(ENV)

  return {
    base: ENV.VITE_BASE,
    server: {
      port: 48763,
    },
    envDir: path.resolve(__dirname, 'env'),
    build: {
      rollupOptions: {
        external: [
          // '/ian-project/src/main.js'
        ]
      }
    },
    define: {
      PACKAGE
    },
    optimizeDeps: {
      include: [
        'vue'
      ]
    },
    plugins: [
      rollupAlias(),
      vue(),
      vueJsx(),
      // requireTransform.default({
      //   fileRegex: /.ts$|.js$|.vue$/
      // })
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            mainSrc: ENV.VITE_MAIN_JS_SRC,
          }
        }
      }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCase'
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // '@assets': path.resolve(__dirname, 'src/assets'),
        // '@router': path.resolve(__dirname, 'src/router'),
        // '@views': path.resolve(__dirname, 'src/views'),
        // '@img': path.resolve(__dirname, `src/assets/img`),
        // '@font': path.resolve(__dirname, `src/assets/font`),
        // '@svgicons': path.resolve(__dirname, `src/assets/svgicons`),
        // '@components': path.resolve(__dirname, `src/components`),
        // '@theme': path.join(__dirname, `src/theme`)
      }
    }
  }
})
