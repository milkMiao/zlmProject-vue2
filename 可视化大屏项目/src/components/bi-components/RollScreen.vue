<template>
  <span class="split-bar" ref="splitBarRef">
    <i class="item"></i>
  </span>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { mapController } from "@/controller";

const splitBarRef = ref();
let removeRollScreen: any = null;
onMounted(() => {
  const target = document.querySelector("#cesium-container .cesium-viewer");
  if (target) {
    target.appendChild(splitBarRef.value);
    removeRollScreen = mapController.rollScreen(
      "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunityENG/MapServer",
      splitBarRef.value
    );
  }
});
onBeforeUnmount(() => {
  if (removeRollScreen) {
    removeRollScreen();
  }
});
</script>
<style scoped lang="scss">
.split-bar {
  position: absolute;
  width: 5px;
  height: 100%;
  background-color: #ccc;
  left: calc(50% - 5px);
  top: 0;
  cursor: col-resize;
  .item {
    position: absolute;
    left: 0;
    top: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    height: 30px;
    width: 100%;
    border-radius: 8px;
  }
}
</style>
