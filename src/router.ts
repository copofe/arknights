import { createRouter, createWebHistory } from 'vue-router';
import Index from '::/views/index.vue';
import Operations from '::/views/operations.vue';
import Warehouse from '::/views/warehouse.vue';
import Shop from '::/views/shop.vue';
import Settings from '::/views/settings.vue';

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
      path: '/shop',
      name: 'Shop',
      component: Shop,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
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
