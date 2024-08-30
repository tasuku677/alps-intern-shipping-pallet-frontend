// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        background: '#ffffff',
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        danger: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  icons: {
    defaultSet: 'mdi', // デフォルトのアイコンセットをMaterial Design Iconsに設定
  },

});


const app = createApp(App);
app.use(createPinia());
app.use(vuetify);
app.mount('#app');

