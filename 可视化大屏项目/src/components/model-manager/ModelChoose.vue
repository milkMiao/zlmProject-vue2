<template>
  <CustomAside>
    <template #body>
      <a-radio-group v-model:value="modelVal" style="width: 100%">
        <div v-for="item in checkOptions" :key="item.key" style="line-height:30px;">
          <a-radio :value="item.key">{{ item.name }}</a-radio>
          <a class="info">
            <InfoCircleOutlined></InfoCircleOutlined>
          </a>
        </div>
      </a-radio-group>
    </template>
    <template #footer>
      <a-button type="primary" @click="getToken">获取token</a-button>
    </template>
  </CustomAside>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";
import { getModelTokenApi, returnTokenApi } from "./services";
import { useBzStore } from './stores/index'
import { checkOptions } from "./config";

const bzStore = useBzStore()
const modelVal = ref(0)
modelVal.value = checkOptions[0].key
async function getToken() {
  // 目前先归还token，否则直接获取token有问题
  await returnTokenApi()
  getModelTokenApi().then(res => {
    if (res.code === 0) {
      message.success('token获取成功！')
      bzStore.updateModelToken(res.data.token)
    }
  }).catch(res => {
    message.error('token获取失败！')
  })
}
</script>

<style scoped>
.info {
  float: right;
}
</style>
