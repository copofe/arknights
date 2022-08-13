<script lang="ts">
export default {
  name: "PageIndex",
};
</script>

<script lang="ts" setup>
import { useDeviceOrientation } from '@vueuse/core'
import useStore from "::/store";
import { ref, computed } from 'vue';

const resources = useStore();
const { gamma } = useDeviceOrientation()

const origin = 4.5
const translte = computed(() => {
  return -(((gamma.value || 0) + origin * 10) / origin)
})
</script>

<template>
  <div class="index-bg" />
  <ark-logo />
  <div id="originiums" />
  <div class="flex-1 flex">
    <div class="flex-1"></div>
    <div
      class="flex-1 flex flex-col justify-center"
      :style="{ transform: `perspective(30em) rotateY(${translte}deg) translate3d(-20px, 0, -100px)` }"
    >
      <div class="resources pr-2 mb-12 flex flex-col items-end">
        <div class="mb-6 resource">
          {{ resources.originiuns }}
          <img src="/originiuns.png" class="resource-icon">
        </div>
        <div class="mb-12 resource">
          {{ resources.orundums }}
          <img src="/orundums.png" class="resource-icon">
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="h-32 w-32 flex justify-center items-center text-2xl total">
            <span class="total-num px-2">{{ resources.total }}</span>
          </div>
          <span class="mt-2 text-xs">截止 {{ resources.end.subtract(1, 'day').format('YYYY-MM-DD') }}</span>
        </div>
      </div>
      <div class="client">
        <div class="operations">
          <div>作战</div>
          <div class="icon"></div>
        </div>
        <div class="warehouse translate-x--8">
          <div>仓库</div>
          <div class="icon"></div>
        </div>
        <div class="setting">
          <div>设置</div>
          <div class="icon"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="relative flex pb-2 justify-end text-xl">
    <a class="inline-block text-white px-4" href="https://github.com/copofe/arknights">
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" width="1.2em" height="1.2em"><path fill="currentColor" fill-rule="evenodd" d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2Z"/></svg>
    </a>
  </div>
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
.client > div {
  position: relative;
  background-color: #fdfdfb;
  font-family: 'FZZhunYaSong';
  @apply h-24 my-1 flex items-center justify-around opacity-90 text-5xl text-black text-opacity-90 font-bold;
}
.client > div::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80%;
  background: url(/point-bg.png) no-repeat left bottom;
  background-size: contain;
  opacity: .1;
  z-index: 0;
}
.client > div:first-child:after {
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
  width: 70px;
  height: 70px;
  background: url(/UI_HOME.png);
  filter: invert(20%);
  opacity: .5;
}
.operations .icon {
  background-position: -294px -375px;
  background-size: auto 1600%;
}
.warehouse .icon {
  background-position: 120.4px -660.8px;
  background-size: auto 1700%;
}
.setting .icon {
  background-position: -60.375px -53.375px;
  background-size: auto 1700%;
}
</style>
