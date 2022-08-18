import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/bootstrap/css/bootstrap.min.css"
import "@/assets/bootstrap/js/bootstrap.bundle"
import "@/assets/customStyle.css"



createApp(App).use(store).use(router).mount('#app')


