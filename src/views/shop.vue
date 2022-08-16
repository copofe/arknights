<script lang="ts">
export default {
  name: 'Setting',
};
</script>
<script lang="ts" setup>
import useStore from '::/store';

const { paid, setMonthlyCard } = useStore();

const depots = [
  {
    key: 'monthlyCard',
    name: '月卡',
    icon: '/monthly-card.png',
    enable: paid.monthlyCard,
    cost: '￥30',
    resource: '至纯源石 × 6，每日签到获得合成玉 × 200',
    note: '计算时不包含源石，请自行在仓库中添加',
  },
];
</script>

<template>
  <ark-header />
  <div class="setting flex-1 p-2">
    <div v-for="r in depots" :key="r.key" class="depot card">
      <div class="flex justify-between items-end mb-2">
        <div class="name">{{ r.name }}</div>
        <van-switch :model-value="paid.monthlyCard" :size="18" @change="setMonthlyCard" />
      </div>
      <div class="flex">
        <div class="w-1/4">
          <img :src="r.icon" class="block">
        </div>
        <div class="flex-1 flex flex-col ml-4 text-black">
          <div class="flex-1 desc text-xs">
            {{ r.resource }}
          </div>
          <div class="text-base leading-none flex justify-between items-center">
            <div class="text-2.5 text-gray-500">{{ r.note }}</div>
            <div>{{ r.cost }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.depot {
  @apply mb-2 p-2;
}

.depot .name {
  @apply text-xs leading-3 h-5 px-2 flex items-center bg-neutral-700;
}

.depot .stock {
  @apply text-xs leading-3 h-5 px-2 flex items-center bg-neutral-700;
  overflow: hidden
}

.depot .num {
  @apply text-xs leading-3 px-2 min-w-6 py-1 bg-neutral-400 text-center;
}

.depot img {
  @apply w-full;
}
</style>
