import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

export const api = axios.create({
  baseURL: `https://tracktik-challenge.staffr.com`
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
