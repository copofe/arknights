<script lang="ts">
export default {
  name: 'Warehouse',
};
</script>
<script lang="ts" setup>
import useStore from '::/store';

const { warehouse, setWarehouseResource } = useStore();

const depots = [
  {
    key: 'originiuns',
    name: '至纯源石',
    icon: '/originiuns.png',
    num: warehouse.originiuns,
    source: '采购中心、首次通关获取、活动获取、官方邮件赠送。',
  },
  {
    key: 'orundums',
    name: '合成玉',
    icon: '/orundums.png',
    num: warehouse.orundums,
    source: '剿灭作战、悖论模拟、每日任务、每周任务、月卡、贸易站提交源石订单、购买专业强化包、资质凭证商店兑换、至纯源石直接兑换（1 : 180）、官方邮件赠送。',
  },
  {
    key: 'headhunting',
    name: '寻访凭证',
    icon: '/headhunting.png',
    num: warehouse.headhunting,
    source: '采购中心、任务奖励、活动商店兑换、官方邮件赠送。',
  },
];

const onChange = (val: string, detail: { name: string }) => {
  // @ts-ignore
  setWarehouseResource(detail.name, val * 1);
};
</script>

<template>
  <div class="flex-1 warehouse p-2 flex flex-col">
    <div v-for="r in depots" :key="r.key" class="depot card">
      <div class="flex justify-between items-end mb-2">
        <div class="name">{{ r.name }}</div>
        <div class="flex items-end">
          <div class="stock">库存</div>
          <van-stepper
            :default-value="r.num"
            :name="r.key"
            :min="0"
            :button-size="20"
            input-width="6em"
            integer
            @change="onChange"
          />
        </div>
      </div>
      <div class="flex py-2">
        <div class="w-1/4 text-center">
          <img :src="r.icon">
        </div>
        <div class="flex-1 ml-4 flex">
          <div class="flex-1 desc text-black text-2.5">
            {{ r.source }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  @apply w-60%;
}
</style>
