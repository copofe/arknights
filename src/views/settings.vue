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
      label="剿灭合成玉报酬"
      label-class="flex-1"
      type="digit"
      max="1800"
      input-align="right"
      :model-value="settings.annihilationReward"
      @update:model-value="store.setAnnihilationReward"
    >
      <template #button>
        /1800
      </template>
    </van-field>
  </div>
</template>
