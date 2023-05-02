<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { Button, Modal, UploadDragger, Space } from "ant-design-vue";
import LayersTree from "./LayersTree.vue";
const visible = ref(false);
function showModal() {
  visible.value = true
}
function handleCancel() {
  visible.value = false
}
function handleOk() {
  handleCancel()
}
import layers from "@/config/layers";
</script>

<template>
  <CustomAside>
    <template #body>
      <LayersTree :layers="layers" />
    </template>
    <template #footer>
      <Button type="primary" shape="round" @click="showModal">
        <template #icon>
          <UploadOutlined></UploadOutlined>
          添加图层
        </template>
      </Button>
    </template>
  </CustomAside>
  <Modal :visible="visible" title="添加图层" :footer="null" @ok="handleOk" @cancel="handleCancel">
    <!-- <UploadDragger
      v-model:fileList="fileList"
      name="uploadfile"
      action="/api/upload"
      method="post"
      @change="handleChange"
    >
      <p class="ant-upload-drag-icon">
        <InboxOutlined></InboxOutlined>
      </p>
      <p class="ant-upload-text">点击或拖拽文件到当前区域</p>
      <p class="ant-upload-hint">支持Shpfile(zipped)</p>
    </UploadDragger> -->
    <base-upload-file :isInit="visible"></base-upload-file>
  </Modal>
</template>

<style scoped>
.layer-manager {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #fff;
}

.layer-manager .body {
  height: calc(100% - 80px);
  overflow-y: auto;
  padding: 20px;
}

.layer-manager .footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  padding: 20px;
  background: #fff;
  box-shadow: 3px 3px 6px 1px rgba(0, 0, 0, 0.3);
}
</style>
