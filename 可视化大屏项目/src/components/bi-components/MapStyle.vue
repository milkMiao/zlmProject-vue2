<template>
  <div>
    <Classification type="color" :fields="fields" />
    <Classification type="size" :fields="fields" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Classification from "./Classification.vue";

defineProps<{
  type: string;
  fields: any[];
}>();
</script>

<style scoped lang="scss"></style>
