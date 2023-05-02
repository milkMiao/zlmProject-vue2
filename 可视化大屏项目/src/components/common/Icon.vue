<script setup lang="ts">
import type { DefineComponent } from "vue";
import BaseIcon from "./BaseIcon.vue";

const props = defineProps<{
  icon: string | DefineComponent;
}>();
</script>

<template>
  <span v-if="typeof props.icon === 'string'" class="base-icon">
    <!-- <svg class="icon" aria-hidden="true">
      <use :xlink:href="props.icon"></use>
    </svg> -->
    <i :class="['icon', icon]"></i>
  </span>
  <Component v-else :is="props.icon"></Component>
</template>

<style scoped>
.base-icon {
  font-size: 30px !important;
  font-weight: bold !important;
  display: flex !important;
  align-items: center;
  height: 100%;
}
</style>
