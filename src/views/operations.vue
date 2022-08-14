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
  <div class="flex-1 p-2">
    <div class="paradox-simulation card w-full">
      <div class="bg" />
      <van-field
        label="悖论模拟"
        type="digit"
        input-align="right"
        autofocus
        placeholder="未完成悖论模拟的干员数量"
        :model-value="operations.paradoxSimulation"
        @update:model-value="store.setParadoxSimulation"
      >
        <template #button>
          ×200
        </template>
      </van-field>
    </div>
  </div>
</template>

<style scoped>
.paradox-simulation .bg {
  @apply h-32;
  background: url(/paradox-simulation.jpg) no-repeat center center;
  background-size: cover;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

</style>
