<template>
  <div>
    <div v-for="(item,index) in property.value" :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const props = defineProps({
  property: Object
})
</script>

<style scoped lang='scss'>
</style>