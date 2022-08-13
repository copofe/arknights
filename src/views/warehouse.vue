<script lang="ts">
export default {
  name: 'Warehouse'
}
</script>
<script lang="ts" setup>
import useStore from '::/store';

const { warehouse, setWarehouseResource } = useStore()

const depots = [
  {
    key: 'originiuns',
    name: '至纯源石',
    icon: '/originiuns.png',
    num: warehouse.originiuns,
  },
  {
    key: 'orundums',
    name: '合成玉',
    icon: '/orundums.png',
    num: warehouse.orundums,
  },
  {
    key: 'headhunting',
    name: '寻访凭证',
    icon: '/headhunting.png',
    num: warehouse.headhunting,
  },
]

const onChange = (val: string, detail: { name: string }) => {
  // @ts-ignore
  setWarehouseResource(detail.name as Resource, val * 1)
}
</script>

<template>
  <div class="flex-1 warehouse p-2 flex flex-col">
    <div v-for="d in depots" :key="d.key" class="depot">
      <div class="flex justify-between items-end mb-2">
        <div class="name">{{ d.name }}</div>
        <div class="flex items-end">
          <div class="stock">库存</div>
          <van-stepper :default-value="d.num" :name="d.key" :min="0" :button-size="20" input-width="6em" integer @change="onChange" />
        </div>
      </div>
      <div class="flex">
        <img :src="d.icon">
        <div class="flex-1 ml-4 flex flex-col">
          <div class="flex-1 desc"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.warehouse {
  background: url(/w-bg.png) repeat rgba(248,248,248,0.8);
  background-clip: border-box;
  box-shadow: inset 0 0 24px rgba(0,0,0,0.1);
}
.depot {
  @apply mb-2 p-2;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
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
  @apply w-16vw h-16vw;
}
</style>