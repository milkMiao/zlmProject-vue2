<script lang="ts" setup>
</script>

<template>
  <div class="layer-manager">
    111
  </div>
</template>

<style scoped>
.layer-manager {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.layer-manager .body {
  height: calc(100% - 80px);
  overflow-y: auto;
}

.layer-manager .footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  padding: 20px;
  background: #fff;
  box-shadow: 3px 3px 6px 1px rgba(0, 0, 0, 0.3);
}
</style>
