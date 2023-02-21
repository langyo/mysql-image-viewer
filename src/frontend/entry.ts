import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createWebHistory } from 'vue-router';

import { handleTermination } from './utils/crashHandler';
import { generateRouter } from './utils/router';
import { i18n } from './utils/i18n';
import App from './app.vue';

import './node_modules/element-plus/dist/index.css';

(async () => {
  try {
    const app = createApp(App);

    app.use(generateRouter(createWebHistory(), location.href));
    app.use(createPinia());
    app.use(i18n);

    app.mount('#__root');
  } catch (err) {
    handleTermination(err);
  }
})();
