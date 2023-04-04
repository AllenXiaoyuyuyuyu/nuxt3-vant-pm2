<template>
  <div class="home">
    <Title>首页</Title>
    首页<van-button type="primary">主要按钮</van-button>
  </div>
</template>
<script setup lang="ts">
const HasShow = useHasShow();
</script>
<style lang="scss" scoped>
.home {
  width: 375px;
  font-size: 24px;
  height: 667px;
}
</style>
