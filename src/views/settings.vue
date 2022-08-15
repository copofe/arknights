<script lang="ts">
export default {
  name: 'Setting',
};
</script>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useStore from '::/store';

const store = useStore();
const { settings } = storeToRefs(store);

</script>

<template>
  <div class="p-2">
    <van-field
      label="剿灭报酬上限"
      label-class="flex-1"
      type="digit"
      max="1800"
      input-align="right"
      :model-value="settings.annihilationReward"
      @update:model-value="(v: number) => store.updateSettings('annihilationReward', v * 1)"
    >
      <template #button>
        /1800
      </template>
    </van-field>
    <van-field
      label="本周剿灭进度"
      label-class="flex-1"
      type="digit"
      :max="settings.annihilationReward"
      input-align="right"
      :model-value="settings.currentWeekAnnihilation"
      @update:model-value="(v: number) => store.updateSettings('currentWeekAnnihilation', v * 1)"
    >
      <template #button>
        /{{ settings.annihilationReward }}
      </template>
    </van-field>
    <van-cell center title="本周任务合成玉是否领取">
      <template #right-icon>
        <van-switch
          :model-value="settings.currentWeekTaskOrundums"
          size="24"
          @change="(v: boolean) => store.updateSettings('currentWeekTaskOrundums', v)"
        />
      </template>
    </van-cell>
  </div>
</template>
