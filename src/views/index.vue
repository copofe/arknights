<script lang="ts">
export default {
  name: 'Index',
};
</script>

<script lang="ts" setup>
import { useDeviceOrientation } from '@vueuse/core';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useStore from '::/store';

const store = useStore();
const {
  originiuns, orundums, total, end,
} = storeToRefs(store);

const endDate = computed(() => end.value.format('YYYY-MM-DD'));
const { gamma } = useDeviceOrientation();

const origin = 4.5;
const translte = computed(() => {
  return -(((gamma.value || 0) + origin * 10) / origin);
});

const dateSelector = ref(false);
const showDateSelector = () => {
  dateSelector.value = true;
};
const onDateChange = (val: Date) => {
  store.setEndTime(val.valueOf());
  dateSelector.value = false;
};
</script>

<template>
  <div class="index-bg" />
  <ark-logo />
  <div id="originiums" />
  <div class="flex-1 flex relative">
    <div class="flex-1 flex flex-col justify-end">
      <div class="px-2 pb-2 text-xs text-gray-300">
        <div>tips</div>
        <div>* 点击时间可修改</div>
        <div class="mt-1">开发进度</div>
        <div class="line-through opacity-50">* 库存资源设置</div>
        <div class="line-through opacity-50">* 日常资源计算</div>
        <div>* 活动资源计算</div>
        <div>* 付费资源计算</div>
        <div>* 关卡资源计算</div>
        <div>* 自动增加日常资源</div>
      </div>
    </div>
    <div
      class="flex-1 flex flex-col justify-center"
      :style="{
        transform: `perspective(30em) rotateY(${translte}deg) translate3d(-20px, 0, -100px)`
      }"
    >
      <div class="resources mb-8 flex flex-col items-end">
        <div class="mb-6 !pr-1 resource" @click="showDateSelector">
          {{ endDate }}
        </div>
        <div class="mb-6 resource">
          {{ originiuns }}
          <img src="/originiuns.png" class="resource-icon">
        </div>
        <div class="mb-8 resource">
          {{ orundums }}
          <img src="/orundums.png" class="resource-icon">
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="w-28 h-28 flex justify-center items-center text-2xl total">
            <span class="total-num px-2">{{ total }}</span>
          </div>
          <span class="mt-2 text-xs">
            最终折算抽数
          </span>
        </div>
      </div>
      <div class="client">
        <router-link :to="{ name: 'Operations' }" class="unit operations">
          <div class="flex flex-col items-center">
            <div>作战</div>
            <div class="text-xs font-normal opacity-50">待完善</div>
          </div>
          <div class="icon" />
        </router-link>
        <router-link :to="{ name: 'Warehouse' }" class="unit warehouse translate-x--8">
          <div>
            <div>仓库</div>
          </div>
          <div class="icon" />
        </router-link>
        <router-link :to="{ name: 'Setting' }" class="unit setting">
          <div class="flex flex-col items-center">
            <div>设置</div>
            <div class="text-xs font-normal opacity-50">待完善</div>
          </div>
          <div class="icon" />
        </router-link>
      </div>
    </div>
  </div>
  <div class="fixed right-0 bottom-0 flex pb-2 justify-end text-xl leading-4">
    <a class="inline-block text-white px-4" href="https://github.com/copofe/arknights">
      <!-- eslint-disable max-len vue/max-len -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 32 32"
        width="1.2em"
        height="1.2em"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2Z"
        />
      </svg>
      <!-- eslint-enable -->
    </a>
  </div>
  <van-popup v-model:show="dateSelector" position="bottom">
    <van-datetime-picker type="date" :min-date="new Date()" @confirm="onDateChange" />
  </van-popup>
</template>

<style scoped>
#originiums {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(/originiums.png) no-repeat -21% center;
  background-size: auto 42%;
}
.index-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(/UI_HOME_FRONT_BKG.png) no-repeat right bottom;
  background-size: cover;
  z-index: 0;
  /* filter: brightness(1) */
}
.resource {
  position: relative;
  background: linear-gradient(to left, rgba(0, 0, 0, .5), transparent);
  @apply w-1/2 text-right pl-1 pr-2.4em;
}
.resource-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 2em;
}
.total {
  position: relative;
  background: url(/headhunting-b.png) no-repeat center center;
  background-size: cover;
 }
 .total-num {
  position: absolute;
  right: 10%;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  color: #fff;
 }
.client .unit {
  position: relative;
  background-color: #fdfdfb;
  font-family: 'FZZhunYaSong';
  font-size: 42px;
  @apply my-2 p-2 flex justify-around opacity-90 text-black font-bold overflow-hidden;
}
.client .unit::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 75%;
  background: url(/point-bg.png) no-repeat left bottom;
  background-size: contain;
  opacity: .1;
  z-index: 0;
}
.client .unit:first-child:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 15%;
  width: 70%;
  height: 2px;
  background-color: #ff5e19;
  z-index: 1;
}
.client .icon {
  width: 60px;
  height: 60px;
  background: url(/UI_HOME.png);
  filter: invert(20%);
  opacity: .5;
}
.operations .icon {
  background-position: calc(-420px * 0.6) calc(-535.714px * 0.6);
  background-size: auto 1600%;
}
.warehouse .icon {
  background-position: calc(172px * 0.6) calc(-944px * 0.6);
  background-size: auto 1700%;
}
.setting .icon {
  background-position: calc(-86.25px * 0.6) calc(-76.25px * 0.6);
  background-size: auto 1700%;
}
</style>
