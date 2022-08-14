<script lang="ts">
export default {
  name: 'App',
};
</script>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import useStore from '::/store';

const store = useStore();
const route = useRoute();
</script>

<template>
  <div
    v-if="route.name !== 'Index'"
    class="fixed left-0 top-0 bg-black bg-opacity-50 px-1 text-xs z-1000"
  >
    {{ store.total }}
  </div>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
