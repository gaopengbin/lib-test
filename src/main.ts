import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import './assets/fonts/font-family.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import 'ssczm'
import 'ssczm/dist/style.css'
import naive from 'naive-ui'
console.log(naive)
createApp(App).use(naive).mount('#app')
