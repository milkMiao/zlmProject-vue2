<script setup lang="ts">
import { onMounted, ref, watch, reactive, provide } from "vue";
import {
  Layout,
  LayoutSider,
  LayoutContent,
  ConfigProvider,
  LayoutHeader,
} from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { useMenuStore } from "@/stores/menu";
import { useToolsStore } from "@/stores/tools";
import { useLeftAsideStore, useRightAsideStore } from "@/stores/viewports";
import { SystemMenu, SystemTools, CesiumMap } from "@/components";
import { Left, Right } from "@/components/jiaxing";
import FloodGradeTable from "./components/inundation-analysis/FloodGradeTable.vue";
const menuStore = useMenuStore();
const toolsStore = useToolsStore();

const leftAsideStore = useLeftAsideStore();
const rightAsideStore = useRightAsideStore();
const collapsedWidth = "60px";
const layerAttrVisible = ref(false);
const layoutCotentRef = ref();
const layerAttrsData = ref({});
const isDev = import.meta.env.MODE === "development";
provide("getLayerAttr", getLayerAttr);
onMounted(() => {
  menuStore.changeSelectedKeys({ selectedKeys: ["0"] });
  getContainer();
});
function getLayerAttr(data) {
  layerAttrsData.value = data;
  layerAttrVisible.value = true;
}
function getContainer() {
  return layoutCotentRef.value.$el;
}
</script>

<template>
  <config-provider :locale="zhCN">
    <Layout class="layout">
      <LayoutHeader style="
          position: relative;
          height: 50px;
          padding-left: 20px;
          background-color: #141414;
        ">
        <dv-decoration1 style="width: 200px; height: 100%; position: absolute; right: 0" />
        <div class="logo"></div>
      </LayoutHeader>
      <LayoutContent style="height: calc(100vh - 50px)">
        <Layout style="height: 100%; position: relative">
          <!-- <LayoutSider
        collapsible
        :width="150"
        :collapsedWidth="collapsedWidth"
        :collapsed="menuStore.collapsed"
        @collapse="menuStore.toggleCollapsed"
      >
        <SceneSwitch :collapsed="menuStore.collapsed" />
        <SystemMenu />
      </LayoutSider> -->
          <!-- <CustomizeModal
        v-if="leftAsideStore.viewConfig.type === 'modal'"
        :title="menuStore.selectedMenuItem.name"
        :collapsed="leftAsideStore.collapsed"
        :viewConfig="leftAsideStore.viewConfig"
        @collapse="leftAsideStore.toggle"
      ></CustomizeModal>
      <Sider
        v-else
        theme="light"
        :title="menuStore.selectedMenuItem.name"
        :collapsed="leftAsideStore.collapsed"
        :viewConfig="leftAsideStore.viewConfig"
        @collapse="leftAsideStore.toggle"
      /> -->

          <div :dur="5" class="float-sider left">
            <Left />
          </div>
          <div class="legend">
            <dv-border-box-7>
              <div style="text-align: center; padding: 5px 0 0 0; color: #fff">
                图例
              </div>
              <dv-decoration5 :dur="2" style="width: 100%; height: 20px; margin-top: -8px" />
              <FloodGradeTable />
            </dv-border-box-7>
          </div>
          <LayoutContent class="layout-content" ref="layoutCotentRef">
            <CesiumMap />
            <BaseModal class="attrs-panel" type="custom" width="65%" :style="layerAttrsData?.style" :title="layerAttrsData.name" v-model:visible="layerAttrVisible">
              <Component :is="layerAttrsData?.component ?? BaseTableXHR" v-bind="layerAttrsData" />
            </BaseModal>
          </LayoutContent>
          <!-- <Sider
        theme="light"
        :title="toolsStore.selectedToolItem.name"
        :collapsed="rightAsideStore.collapsed"
        :viewConfig="rightAsideStore.viewConfig"
        @collapse="rightAsideStore.toggle"
      /> -->
          <div class="float-sider right">
            <Right />
          </div>
          <!-- <LayoutSider
        class="aaa"
        width="300px"
        :collapsed="true"
        theme="light"
        :collapsedWidth="collapsedWidth"
      >
        <SystemTools />
      </LayoutSider> -->
          <!-- 测试用没有任何含义 -->
          <Test v-if="isDev" />
        </Layout>
      </LayoutContent>
    </Layout>
  </config-provider>
</template>

<style lang="scss" scoped>
.left-aside {
  height: 100%;
}

.logo {
  height: 100%;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  background: url('./assets/images/title@2x.png') no-repeat;
  background-size: contain;
  background-position: -30px;
}

.layout-content {
  position: relative;
}

.legend:deep(.ant-table) {
  background: transparent;
}

.layout-content:deep(.attrs-panel) {
  position: absolute;
  // bottom: 0;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  // height: 400px;
  background: transparent;
  color: #fff;
  border: 1px solid rgb(29, 193, 245);
  .content-body {
    max-height: fit-content;
  }
}

.float-sider {
  position: absolute;
  top: 10px;
  height: calc(100% - 105px);
  overflow: hidden;
  width: 300px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: saturate(150%) blur(5px);
  z-index: 999;
}

.float-sider.left {
  left: 10px;
}
.float-sider.right {
  right: 10px;
}

.float-sider.right {
  height: calc(100% - 60px);
}

.legend {
  position: absolute;
  bottom: 50px;
  right: 320px;
  width: 180px;
  background: #fff;
  // height: 250px;
  z-index: 999;
  border-radius: 4px;
  background: transparent;
}
</style>
