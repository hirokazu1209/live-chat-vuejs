// 全てはこのファイルからスタートする
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vue.jsアプリを動かすためのさまざまな機能が構築・用意されている
createApp(App).use(router).mount('#app')
