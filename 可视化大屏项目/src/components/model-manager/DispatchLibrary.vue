<!--
 * @Author: zhixian
 * @Date: 2022-06-05 17:37:46
 * @Description: 
-->
<template>
  <!-- <CheckboxGroup v-model:value="value" style="width: 100%">
        <Row :gutter="[16, 16]">
          <Col :span="24" v-for="item in dispatchLibrary" :gutter="[16, 16]">
            <Checkbox :value="item.key">{{ item.name }}</Checkbox>
            <a class="info">
              <InfoCircleOutlined />
            </a>
          </Col>
        </Row>
      </CheckboxGroup> -->
  <LayersTreeComp ref="treeRef" class="tree" @handleSelect="handleTreeSelect" :layers="layersTree">
    <template #moreInfo="slotProps">
      <a-dropdown v-if="slotProps.data.leaf" :trigger="['click']">
        <span @click.stop.prevent>
          <MoreOutlined />
        </span>
        <template #overlay>
          <a-menu @click="(e) => handleMenuClick(e, slotProps.data.dataRef)">
            <a-menu-item key="zooTo"> 缩放至 </a-menu-item>
            <a-menu-item key="reName"> 重命名 </a-menu-item>
            <a-menu-item key="showTable"> 属性表 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <!-- <span class="title" @click="showStatisticsInfo(slotProps.data.dataRef)">统计信息</span> -->
    </template>
  </LayersTreeComp>
  <!-- <template #footer> </template> -->
</template>

<script lang="ts" setup>
import { ref, inject, Ref, onActivated } from "vue";
import {
  CheckboxGroup,
  Checkbox,
  Row,
  Col,
  Button,
  Space,
  message,
} from "ant-design-vue";
import {
  UploadOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons-vue";
import emitter from '@/utils/bus'
import { getTableFields } from "@/request/interceptor";
import LayersTreeComp from "@/components/bi-components/LayersTree.vue";
import { getModelToken } from "./utils/work";
import { dispatchLibrary } from "./config";
import { useModelStore } from './stores/index'

const treeRef = ref();
const layersTree: Ref<Array<any>> = ref([]);
const bzStore = useModelStore()
getDispatchLibrary();
onActivated(() => {
  // getModelToken()
  // getDispatchLibrary()
});

function handleTreeSelect(selectData: any, currentData: any, isCheck: boolean) {
  bzStore.updateSelectModelLibrary(selectData)
  debugger
  emitter.emit('selectModelLibrary', { currentData, isCheck })
}
function getDispatchLibrary() {
  layersTree.value = dispatchLibrary;
}
function handleMenuClick(e: any, data: any) {
  treeRef.value.handleMenuClick(e, data);
}
</script>

<style scoped>
.info {
  float: right;
}
.tree:deep(.ant-tree-switcher) {
  display: none;
}
</style>
