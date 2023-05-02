<template>
  <div style="padding: 8px" class="content scrollbar">
    <div class="map-item" :class="[activeIndex === index ? 'active' : '']" v-for="(item, index) in basemap" @click="toggleMap(item, index)" :key="index">
      <i class="img" :style="{ background: 'url(' + item.img + ') no-repeat center center' }"></i>
      <span class="title ellipsis" :title="item.title">{{ item.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import basemapJson from "@/config/basemap";
import { mapController } from "@/controller";

import { ref } from "vue";
const basemap = ref(basemapJson);
const activeIndex = ref(0);
function toggleMap(data: any, index: number) {
  activeIndex.value = index;
  mapController.changeImageryLayer(data.url, 0, 0, data.type);
}
</script>

<style scoped lang="scss">
.active {
  background-color: #e6f7ff;
  // color: white;
}
.content {
  padding: 8px;
  max-height: 100%;
  overflow-y: auto;
}
.map-item {
  transition: all 0.3s;
  margin-top: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  // border-bottom: 1px solid #ccc;
  // justify-content: space-between;
  .img {
    border: 1px solid #ccc;
    display: inline-block;
    width: 60px;
    height: 60px;
  }
  .title {
    margin-left: 10px;
  }
}
</style>
