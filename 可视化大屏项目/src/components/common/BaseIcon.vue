<script setup lang="ts">

defineProps<{
  icon: any;
}>();
</script>

<template>
  <span class="base-icon">
    <!-- <svg class="icon" aria-hidden="true">
      <use :xlink:href="props.icon"></use>
    </svg> -->
    <i :class="['icon', icon]"></i>
  </span>
</template>

<style scoped>
</style>
