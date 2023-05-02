<template>
  <div>
    <Modal :class="dialogClass" wrapClassName="custom-dialog" ref="modalRef" v-bind="$attrs">
      <div class="content-body scrollbar">
        <slot />
      </div>
      <template v-slot:title>
        <div class="title">
          <span>{{ title }}</span>
          <span class="full-screen-btn iconfont" @click="toggleFullscreen">
            <fullscreen-exit-outlined v-if="!isFullScreen" />
            <fullscreen-outlined v-else />
          </span>
        </div>
      </template>
      <template v-for="slot in comSlot" v-slot:[slot]>
        <slot :name="slot" />
      </template>
    </Modal>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, useSlots, onMounted } from 'vue'
import { Modal } from 'ant-design-vue'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
const defaultSlots = ['title', 'default']
// const fullscreenClass = ref('iconfullscreen-exit')
const isFullScreen = ref(false)
const dialogClass = ref('')
const modalRef = ref()
const slots = useSlots()
const props = defineProps({
  title: String
})
const comSlot = computed(() => {
  const arr = Object.keys(slots).filter(
    (key) => !defaultSlots.includes(key)
  )
  return arr
})
toggleFullscreen()
onMounted(() => {
  modalRef.value.$el
})
function toggleFullscreen() {
  if (isFullScreen.value) {
    // fullscreenClass.value = 'iconfullscreen-exit'
    dialogClass.value = 'full-screen-modal'
  } else {
    // fullscreenClass.value = 'iconfullScreen'
    dialogClass.value = 'normal-screen-modal'
  }
  isFullScreen.value = !isFullScreen.value
}
</script>

<style scoped lang='scss'>
.title {
  display: flex;
  justify-content: space-between;
}
.content-body {
  max-height: 65vh;
  // overflow: auto;
}
.full-screen-modal {
  .content-body {
    max-height: 100%;
  }
}
.full-screen-btn {
  margin-right: 40px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.45);
}
</style>