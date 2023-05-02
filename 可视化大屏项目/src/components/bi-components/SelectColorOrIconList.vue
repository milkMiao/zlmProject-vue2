<!--
 * @Author: zhixian
 * @Date: 2022-05-29 14:02:08
 * @Description: 
-->
<template>
  <div class="select-color-or-icon-list"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, watchEffect, ref } from "vue";
import SelectColorOrIcon from "./SelectColorOrIcon.vue";

const props = defineProps<{
  field: string;
}>();
const list = ref<any>([]);
</script>

<style scoped lang="scss"></style>
