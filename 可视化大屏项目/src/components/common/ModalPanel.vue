<template>
  <div class="modal-panel" ref="modalPanelRef" v-show="visible" :style="comStyle">
    <div class="header">
      <span>{{title}}</span>
      <close-outlined class="close" @click="cancelFn" />
    </div>
    <div class="content-body scrollbar">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
const modalPanelRef = ref()
const props = defineProps({
  title: String,
  visible: Boolean,
  width: {
    type: String,
    default: () => '40%'
  }
})
const emit = defineEmits<{
  (event: 'update:visible', data: boolean): void
  (event: 'cancel'): void
}>()
const comStyle = computed(() => {
  const style = {
    width: props.width,
    left: `calc(50% - (${props.width} / 2))`
  }
  return style
})
function cancelFn() {
  emit('update:visible', false)
}
props: {
  aa: String
}
</script>

<style scoped lang='scss'>
.modal-panel {
  position: absolute;
  background-color: white;
  top: 100px;
  z-index: 99999;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  // left: 50%;
  .header {
    height: 45px;
    padding: 0 10px;
    display: flex;
    border-bottom: 1px solid rgb(235, 233, 233);
    align-items: center;
    justify-content: space-between;
    .close {
      cursor: pointer;
    }
  }
  .content-body {
    max-height: 65vh;
    padding: 10px;
    // overflow: auto;
  }
}
</style>