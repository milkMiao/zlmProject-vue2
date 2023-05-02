import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vueJsx(),
    vue(),
    cesium(),
    PkgConfig(),
    OptimizationPersist(),
    Components({
      resolvers: [AntDesignVueResolver()],
      dirs: ['src/components/common'],
      deep: true,
      dts: 'src/types/auto-import.d.ts'
      // importPathTransform: () => {
      //   return '/src/types'
      // }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    //css预处理
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "@/assets/scss/globalVariable.scss";',
      }
    }
  },
  server: {
    proxy: {
      //API服务
      '/api': {
        target: 'http://47.100.229.195',
        changeOrigin: true,
        rewrite: path => {
          return path.replace(/^\/api/, '')
        }
      },
      //FME服务
      '/fme': {
        target: 'http://47.100.229.195:8090',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/fme/, '')
      },
      //3D切片服务
      '/3dtiles': {
        target: 'http://47.100.229.195:8098',
        changeOrigin: true,
        rewrite: path => {
          return path.replace(/^\/3dtiles/, '')
        }
      },
      //普通切片服务
      '/tile': {
        target: 'http://47.100.229.195:8080/',
        changeOrigin: true
      },
      //新切片服务
      '/new_til2': {
        target: 'http://47.100.229.195:8010',
        changeOrigin: true,
        rewrite: path => {
          return path.replace(/^\/new_til2/, '')
        }
      },
      '/model_api': {
        target: 'http://47.100.229.195:8080',
        changeOrigin: true
        // rewrite: path => {
        //   return path.replace(/^\/new_til2/, '')
        // }
      }
    }
  }
})
