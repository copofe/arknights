<script lang="ts">
export default {
  name: 'ArkLogo',
};
</script>

<template>
  <div class="logo relative">
    <img src="/logo.png">
  </div>
</template>

<style>
.logo {
  display: flex;
  justify-content: center;
  height: 60px;
  padding: 6px 0;
  pointer-events: none;
}
.logo img {
  width: 120px;
  height: 60px;
}
</style>
