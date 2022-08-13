<script lang="ts">
export default {
  name: 'Setting',
};
</script>
<script lang="ts" setup>
import useStore from '::/store';

const { paid, setMonthlyCard } = useStore();
</script>

<template>
  <div class="setting flex-1 p-2">
    <van-cell class="cell" title="月卡" label="仅计算每日200玉，6源石请自行在仓库中添加">
      <van-switch :model-value="paid.monthlyCard" :size="20" @change="setMonthlyCard" />
    </van-cell>
  </div>
</template>

<style>
.setting {
  background: url(/w-bg.png) repeat rgba(248, 248, 248, 0.8);
  background-clip: border-box;
  box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.1);
}
.cell {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>
