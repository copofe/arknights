import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('::/views/index.vue'),
    },
    {
      path: '/operations',
      name: 'Operations',
      component: () => import('::/views/operations.vue'),
    },
    {
      path: '/warehouse',
      name: 'Warehouse',
      component: () => import('::/views/warehouse.vue'),
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('::/views/setting.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
