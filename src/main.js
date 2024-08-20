// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Vuetifyのスタイルをインポート

const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          // 背景色をカスタマイズ
          background: '#ffffff',
        },
      },
    },
  });
  
  
const app = createApp(App);
app.use(createPinia());
app.use(vuetify);
app.mount('#app');

