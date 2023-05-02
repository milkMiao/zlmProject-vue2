<script setup lang="ts">
import { ref } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import TimeSetting from "../model-manager/TimeSetting.vue";
import DispatchLibrary from "../model-manager/DispatchLibrary.vue";
import { getModelTokenApi, returnTokenApi, hisResultExtractApi } from '../model-manager/services/index'
import { message } from 'ant-design-vue';
import { useModelStore } from '../model-manager/stores'

const timeSettingRef = ref()
const activeKey = ref(["1", "2", "3", "4"]);

//模型类型
const modelType = ref(1);
const modelBzStore = useModelStore()
const radioStyle = {
  display: "flex",
};
function getToken() {
  returnTokenApi().then(res => {
    getModelTokenApi().then((res: any) => {
      if (res.code === 0) {
        modelBzStore.updateModelToken(res.data.token)
        message.success('token获取成功！')
      }
    })
  })
}
async function modelCalc() {
  timeSettingRef.value.hisResultExtractFn()
}

const handleClick = () => { };
</script>

<template>
  <dv-border-box1 :dur="5">
    <div class="w100">
      <!-- 模型调用 -->
      <dv-decoration7 class="decoration">
        <div class="content">模型调用</div>
      </dv-decoration7>
      <div style="width: 100%">
        <ARadioGroup v-model:value="modelType" buttonStyle="outline" optionType="”button“">
          <ARadioButton :value="1">实时模型</ARadioButton>
          <ARadioButton :value="2">预报模型</ARadioButton>
        </ARadioGroup>
      </div>
      <ARow justify="center" style="margin-top: 10px">
        <AButton type="primary" justify="center" shape="round" ghost @click="getToken">
          获取令牌
        </AButton>
      </ARow>
      <!-- 分割线 -->
      <dv-decoration2 :dur="2" class="divider" />
      <!-- 时间设置 -->
      <dv-decoration7 class="decoration">
        <div class="content">时间设置</div>
      </dv-decoration7>
      <TimeSetting ref="timeSettingRef" />
      <ARow justify="center" style="margin-top: 10px">
        <AButton @click="modelCalc" type="primary" justify="center" shape="round" ghost>
          模型计算
        </AButton>
      </ARow>
      <!-- 分割线 -->
      <dv-decoration2 :dur="2" class="divider" />

      <dv-decoration7 class="decoration">
        <div class="content">模型结果库</div>
      </dv-decoration7>
      <div style="padding: 0 20px">
        <DispatchLibrary />
      </div>

      <!-- 分割线 -->
      <dv-decoration2 :dur="2" class="divider" />
      <dv-decoration7 class="decoration">
        <div class="content">历史时间洪水演进</div>
      </dv-decoration7>
      <ARow justify="center" style="margin-top: 10px">
        <AButton type="primary" shape="round" ghost>
          烟花期间淹没动态模拟
        </AButton>
      </ARow>
    </div>
  </dv-border-box1>
  <!-- <div class="Panel">
    <ACollapse expandIconPosition="right" v-model:activeKey="activeKey">
      <ACollapsePanel key="1" header="模型调用">
        <ARadioGroup v-model:value="modelType">
          <ARadio :style="radioStyle" :value="1">实时模型</ARadio>
          <ARadio :style="radioStyle" :value="2">预报模型</ARadio>
        </ARadioGroup>
        <ARow justify="center" style="margin-top: 10px">
          <AButton type="primary">获取令牌</AButton>
        </ARow>
        <template #extra><SettingOutlined @click="handleClick" /></template>
      </ACollapsePanel>
      <ACollapsePanel key="2" header="时间设置">
        <TimeSetting />
        <ARow justify="center" style="margin-top: 10px">
          <AButton type="primary">模型计算</AButton>
        </ARow>
        <template #extra><SettingOutlined @click="handleClick" /></template>
      </ACollapsePanel>
      <ACollapsePanel key="3" header="模型结果库">
        <DispatchLibrary />
        <template #extra><SettingOutlined @click="handleClick" /></template>
      </ACollapsePanel>
      <ACollapsePanel key="4" header="历史时间洪水演进">
        <AButton type="primary" shape="round" ghost block
          >烟花期间淹没动态模拟</AButton
        >
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
.w100:deep(.ant-form-item-control-input-content) {
  // color: #fff;
  text-align: left;
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
</style>
