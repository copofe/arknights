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
  <div class="flex-1 p-2 operations">
    <div class="paradox-simulation card w-full">
      <div class="bg" />
      <van-field
        label="请输入待完成的干员数量"
        type="digit"
        class="p-2 bg-transparent"
        label-class="flex-1"
        input-align="right"
        :model-value="operations.paradoxSimulation"
        @update:model-value="store.setParadoxSimulation"
      >
        <template #button>
          × 200
        </template>
      </van-field>
    </div>
  </div>
</template>

<style scoped>
.operations {
  @apply relative;
}
.card {
  --van-field-label-color: #fff;
  --van-field-right-icon-color: #fff;
  --van-field-input-text-color: #fff;
}
.operations::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url(/o-bg.jpg) no-repeat center center;
  background-size: cover;
  filter: grayscale(1) invert(1);
  z-index: 0;
}
.paradox-simulation .bg {
  @apply h-32;
  background: url(/paradox-simulation.jpg) no-repeat center center;
  background-size: cover;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

</style>
