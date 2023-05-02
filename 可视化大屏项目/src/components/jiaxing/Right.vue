<script setup lang="ts">
import { ref } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import LocDataList from "../inundation-analysis/LocDataList.vue";
import BaseDataOption from "../inundation-analysis/BaseDataOption.vue";
import ResultStoreManager from "../inundation-analysis/ResultStoreManager.vue";
const activeKey = ref(["1", "2", "3"]);

const handleClick = () => { };
</script>

<template>
  <dv-border-box1 :dur="5">
    <div class="w100">
      <!-- 模型调用 -->
      <dv-decoration7 class="decoration">
        <div class="content">模型数据选择</div>
      </dv-decoration7>
      <div style="width: 100%">
        <LocDataList />
        <ARow justify="center" style="margin-top: 10px">
          <AButton type="primary" shape="round" ghost>添加模型/淹没图层</AButton>
        </ARow>
      </div>
      <!-- 分割线 -->
      <dv-decoration2 :dur="2" class="divider" />
      <!-- 时间设置 -->
      <dv-decoration7 class="decoration">
        <div class="content">淹没分析</div>
      </dv-decoration7>
      <BaseDataOption />
      <!-- 分割线 -->
      <dv-decoration2 :dur="2" class="divider" />
      <!-- <ARow justify="center" style="margin-top: 10px">
        <AButton type="primary" shape="round" ghost>分析</AButton>
      </ARow> -->
      <dv-decoration7 class="decoration">
        <div class="content">淹没结果库</div>
      </dv-decoration7>
      <ResultStoreManager />
    </div>
  </dv-border-box1>
  <!-- <div class="Panel">
    <ACollapse expandIconPosition="right" v-model:activeKey="activeKey" >
    <ACollapsePanel key="1" header="模型数据选择">
      <LocDataList/>
       <ARow justify="center" style="margin-top:10px">
        <AButton type="primary">添加模型/淹没图层</AButton>
      </ARow> 
      <template #extra><SettingOutlined @click="handleClick" /></template>
    </ACollapsePanel>
    <ACollapsePanel key="2" header="淹没分析">
      <BaseDataOption/>
      <template #extra><SettingOutlined @click="handleClick" /></template>
    </ACollapsePanel>
     <ACollapsePanel key="3" header="淹没结果库">
      <ResultStoreManager/>
      <template #extra><SettingOutlined @click="handleClick" /></template>
    </ACollapsePanel>
  </ACollapse>
  </div> -->
</template>

<style scoped lang="scss">
.w100 {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}

.content {
  color: #fff;
  padding: 0 10px;
}

.divider {
  padding: 10px 30px;
  width: 100%;
  height: 5px;
}

.decoration {
  padding: 10px 0;
  width: 100%;
  height: 50px;
}

.w100:deep(.ant-radio-button-wrapper) {
  background: transparent;
  color: #fff;
}

.w100:deep(.ant-radio-button-wrapper-checked) {
  color: #40a9ff;
}

.w100:deep(.ant-form-item-label > label) {
  color: #fff !important;
}

.w100:deep(.ant-tree) {
  background: transparent;
  color: #fff;
}

.w100:deep(.ant-tree-show-line .ant-tree-switcher) {
  background: transparent;
}
</style>
