import { createRouter, createWebHistory } from 'vue-router';
import Index from '::/views/index.vue';
import Operations from '::/views/operations.vue';
import Warehouse from '::/views/warehouse.vue';
import Setting from '::/views/setting.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/operations',
      name: 'Operations',
      component: Operations,
    },
    {
      path: '/warehouse',
      name: 'Warehouse',
      component: Warehouse,
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
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
