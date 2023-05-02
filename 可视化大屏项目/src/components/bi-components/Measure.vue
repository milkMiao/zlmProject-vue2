<template>
  <div class="measure" ref="measureRef">
    <span title="线" @click="measureFn(0)" :class="[currentIndex===0?'active':'']">
      <base-icon icon="icon-length"></base-icon>
    </span>
    <span title="面" @click="measureFn(1)" :class="[currentIndex===1?'active':'']">
      <base-icon icon="icon-area"></base-icon>
    </span>
    <span title="获取坐标" @click="measureFn(2)" :class="[currentIndex===2?'active':'']">
      <base-icon icon="icon-point"></base-icon>
    </span>
    <span title="清理" @click="measureFn(3)" :class="[currentIndex===3?'active':'']">
      <base-icon icon="icon-clear"></base-icon>
    </span>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { mapController } from "@/controller";
const measureRef = ref()
const currentIndex = ref(0)
watch(currentIndex, (index) => {
  if (index === 0) {
    mapController.measure.measurePolyLine()
  } else if (index === 1) {
    mapController.measure.measurePolygon()
  } else if (index === 2) {
    mapController.measure.getCoordinate()
  } else if (index === 3) {
    mapController.measure.clearAll()
  }
}, {
  immediate: true
})
onMounted(() => {
  const target = document.getElementById('cesium-container')
  target?.appendChild(measureRef.value)
})
function measureFn(index: number) {
  currentIndex.value = index
}
onBeforeUnmount(() => {
  mapController.measure.clearAll()
})
</script>

<style scoped lang='scss'>
.measure {
  position: absolute;
  // width: 200px;
  top: 20px;
  right: 20px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  > span {
    // margin-left: 15px;
    cursor: pointer;
    padding: 0 8px;
    transition: all 0.3s;
    border-right: 1px solid #ccc;
    &:last-child {
      border-right: none;
    }
    :deep(.icon) {
      font-size: 24px;
    }
  }
  .active {
    background-color: rgb(17, 121, 240);
    color: white;
  }
}
</style>