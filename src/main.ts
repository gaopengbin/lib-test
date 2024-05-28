import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'cesium/Build/Cesium/Widgets/widgets.css'
// import '../node_modules/czm-sdk/dist/style.css'
import 'czm-sdk/dist/style.css'
import czmsdk from 'czm-sdk'
console.log(czmsdk)
import naive from 'naive-ui'
createApp(App).use(naive).mount('#app')
