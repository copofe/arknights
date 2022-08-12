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
  <div class="flex">
    <div class="flex-1"></div>
    <div
      class="flex-1 flex flex-col justify-center"
      :style="{ transform: `perspective(30em) rotateY(${translte}deg) translate3d(-20px, 0, -100px)` }"
    >
      <div class="resources pr-2 mb-12 flex flex-col items-end">
        <div class="mb-12 flex flex-col justify-center items-center">
            <div class="h-28 w-28 flex justify-center items-center border-2 border-yellow-400 rounded-full text-5xl">
            {{ resources.total }}
          </div>
          <span class="mt-2 text-xs">截止 {{ resources.end.format('YYYY-MM-DD') }}</span>
        </div>
        <div class="my-2 w-1/2 text-right pl-1 pr-2.4em resource">
          {{ resources.originiuns }}
          <img src="/originiuns.png" class="resource-icon">
        </div>
        <div class="my-2 w-1/2 text-right pl-1 pr-2.4em resource">
          {{ resources.orundums }}
          <img src="/orundums.png" class="resource-icon">
        </div>
        <div class="my-2 w-1/2 text-right pl-1 pr-2.4em resource">
          {{ resources.headhunting }}
          <img src="/headhunting.png" class="resource-icon">
        </div>
      </div>
      <div class="client">
        <div class="action h-24 my-1"></div>
        <div class="warehouse h-24 my-1 translate-x--8"></div>
        <div class="setting h-24 my-1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#originiums {
  position: absolute;
  top: 0;
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
  background: url(/bg.jpg) no-repeat center bottom;
  background-size: 100% auto;
  filter: brightness(1.4)
}
.resource {
  position: relative;
  background: linear-gradient(to left, rgba(255, 255, 255, .5), transparent);
}
.resource-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 2em;
}
.client > div {
  /* From https://css.glass */
  background: rgba(255, 255, 255, .6);
  box-shadow: 0 4px 30px rgba(0, 0, 0, .2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>
