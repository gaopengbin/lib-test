import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteExternalsPlugin } from 'vite-plugin-externals'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteExternalsPlugin({
      'cesium': 'Cesium', // 外部化 cesium 依赖，之后全局访问形式是 window['Cesium']
      '@cesium/widgets': 'Cesium',
    }),
  ],
  optimizeDeps:{
    // exclude: ['cesium']
  },
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
