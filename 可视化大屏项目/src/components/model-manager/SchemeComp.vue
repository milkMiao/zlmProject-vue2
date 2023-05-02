<template>
  <div style="height:100%;">
    <CustomAside class="content">
      <template #body>
        <a-checkbox-group v-model:value="checkedList" :options="schemeOptions" />
      </template>
      <template #footer>
        <a-button size="middle" @click="reset">重置</a-button>
        <a-button size="middle" type="primary" style="margin-left:10px;">开始对比</a-button>
      </template>
    </CustomAside>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const checkedList = ref(['1', '4'])
const schemeOptions = ref([
  { label: '演练方案1:南部80mm', value: '1' },
  { label: '演练方案2:上游200mm', value: '2' },
  { label: '演练方案3:上游80mm', value: '3' },
  { label: '演练方案4:下游200mm', value: '4' }
])
function reset() {
  checkedList.value.length = 0
}
</script>

<style scoped lang='scss'>
.content {
  // padding: 10px;
  // height: calc(100% - 50px);
  :deep(.ant-checkbox-wrapper) {
    display: flex;
    margin-left: 0;
    margin-top: 8px;
  }
}
.footer {
  float: right;
  margin-right: 20px;
}
</style>