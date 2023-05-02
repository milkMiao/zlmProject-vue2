<template>
  <Collapse :activeKey="['1', '2']" ghost>
    <CollapsePanel key="1" header="信息">
      <span>图层名：</span>{{ globalStore?.activeLayer?.name }}
    </CollapsePanel>
    <CollapsePanel key="2" header="样式">
      <Tabs centered>
        <TabPane key="1">
          <template #tab>
            <span>
              <BorderInnerOutlined />
              填充
            </span>
          </template>
          <MapStyle type="fill" :fields="allFields" />
        </TabPane>
        <TabPane key="2">
          <template #tab>
            <span>
              <BorderOuterOutlined />
              边框
            </span>
          </template>
          <MapStyle type="border" :fields="allFields" />
        </TabPane>
      </Tabs>
      <SymbolLegend></SymbolLegend>
    </CollapsePanel>
  </Collapse>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { Collapse, CollapsePanel, Tabs, TabPane } from "ant-design-vue";
import {
  BorderOuterOutlined,
  BorderInnerOutlined,
} from "@ant-design/icons-vue";
import SymbolLegend from "./SymbolLegend.vue";
import MapStyle from "./MapStyle.vue";
import { mapController } from "@/controller";
import { useGlobalStore } from "@/stores/store";
import { getTableFields } from "@/request/interceptor";

const globalStore = useGlobalStore();
const allFields = ref([]);

const getFields = async () => {
  if (globalStore.activeLayer && globalStore.activeLayer.tablename) {
    const column = await getTableFields(globalStore.activeLayer.tablename);
    allFields.value = column;
  }
};

watch(
  () => globalStore.activeLayer,
  () => {
    getFields();
  }
);
</script>

<style scoped lang="scss"></style>
