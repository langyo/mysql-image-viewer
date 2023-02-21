import { createRouter, Router, RouterHistory } from 'vue-router';

import Index from '@/pages/index.vue';

export let router: Router;

export function generateRouter(history: RouterHistory, path: string) {
  router = createRouter({
    history,
    routes: [
      {
        path: '/',
        name: 'index',
        component: async () => Index,
      },
      { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
  });
  router.push(path);

  return router;
}
