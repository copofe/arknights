<script lang="ts">
export default {
  name: 'Operations',
};
</script>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useStore from '::/store';

const store = useStore();

const { operations } = storeToRefs(store);
</script>

<template>
  <div class="bg" />
  <ark-header />
  <div class="flex-1 p-2 relative">
    <div class="paradox-simulation card w-full">
      <div class="flex justify-between p-2 border-b border-white border-op-10">
        <span>悖论模拟</span>
        <span class="subtitle">paradox sumulation</span>
      </div>
      <van-field
        label="请输入待完成的干员数量"
        type="digit"
        class="p-2 bg-transparent"
        label-class="flex-1"
        input-align="right"
        :model-value="operations.paradoxSimulation"
        @update:model-value="store.setParadoxSimulation"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  --van-field-label-color: rgb(200, 200, 200);
  --van-field-right-icon-color: rgb(200, 200, 200);
  --van-field-input-text-color: rgb(200, 200, 200);
  background: linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.5) 30%,
    rgba(255, 0, 0, 0.5)
  );
  color: rgb(200, 200, 200);
}
.bg {
  position: absolute;
  content: " ";
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: url(/o-bg.jpg) no-repeat left top;
  background-size: cover;
  filter: invert(1) grayscale(1);
  z-index: 0;
}
.paradox-simulation .subtitle {
  @apply text-xs uppercase;
  /* background: linear-gradient(to right, rgba(255, 255, 255, .6) 60%, transparent);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text; */
}
</style>
