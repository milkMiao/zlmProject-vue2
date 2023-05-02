<template>
  <template v-if="flag">
    <Modal v-drag v-if="type === 'antd'" v-bind="$attrs">
      <template v-for="slot in Object.keys(slots)" v-slot:[slot]>
        <slot :name="slot" />
      </template>
    </Modal>
    <transition enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutDown" v-else>
      <ModalPanel v-bind="$attrs">
        <template v-for="slot in Object.keys(slots)" v-slot:[slot]>
          <slot :name="slot" />
        </template>
      </ModalPanel>
    </transition>
  </template>
</template>

<script setup lang="ts">
import Modal from "./Modal.vue";
import ModalPanel from "./ModalPanel.vue";
import { ref, useAttrs, useSlots, watch } from "vue";
const attrs = useAttrs();
const flag = ref(false);
const slots = useSlots();
const props = defineProps({
  type: {
    type: String,
    default: () => "antd",
  },
});
watch(
  () => attrs.visible,
  (data) => {
    if (data && !flag.value) {
      flag.value = true;
    }
  }
);
</script>

<style scoped lang="scss">
.animate__animated.animate__fadeInBottomLeft,
.animate__animated.animate__fadeOutBottomRight {
  --animate-duration: 0.15s;
}
// .fade-enter-active,
// .fade-leave-active {
//   transition: all 0.5s ease;
//   transform: translate3d(0,0,0);
// }

// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
//   transform: translate3d(-100%,100%,0);
// }
</style>
