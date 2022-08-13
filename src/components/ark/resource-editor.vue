<script lang="ts">
export default {
  name: 'ResourceEditor'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);

const toggle = () => {
  visible.value = !visible.value;
}
</script>

<template>
  <div v-if="visible" class="resource-editor">
    <div class="mask" @click="toggle"></div>
    <div class="content"></div>
  </div>
  <div @click="toggle">
    <slot name="trigger"></slot>
  </div>
</template>

<style scoped>
.resource-editor .content {
  @apply absolute w-70vw h-50vh overflow-hidden;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 101;
}
.resource-editor .mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 10;
}
</style>