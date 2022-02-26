import { createApp } from 'vue'
import App from './App.vue'
import icons from 'v-svg-icons'

createApp(App)
  .component('icons', icons)
  .mount('#app')
