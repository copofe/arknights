<script lang="ts">
export default {
  name: 'ArkLogo',
};
</script>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import useStore from '::/store';

const store = useStore();
const route = useRoute();
const router = useRouter();
</script>

<template>
  <div
    v-if="route.name !== 'Index'"
    class="realtive flex justify-between items-center p-2 z-1000"
  >
    <div
      class="bg-neutral-700 px-4 text-sm py-1"
      @click="router.back"
    >
      &lt; 返回
    </div>
    <span class="bg-neutral-700 px-1 text-xs">
      {{ store.total }}
    </span>
  </div>
  <div v-else class="logo relative">
    <img src="/logo.png">
  </div>
</template>

<style>
.logo {
  display: flex;
  justify-content: center;
  height: 60px;
  padding: 6px 0;
  pointer-events: none;
}
.logo img {
  width: 120px;
  height: 60px;
}
</style>
