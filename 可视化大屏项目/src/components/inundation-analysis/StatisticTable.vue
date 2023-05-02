<template>
  <Tabs>
    <TabPane key="1" :tab="tab0">
      <BaseTableXHR
        :name="tab0"
        :columns="columns0"
        :otherProps="statisticTables[0]"
      />
    </TabPane>
    <TabPane key="2" :tab="tab1" force-render>
      <BaseTableXHR
        :name="tab1"
        :columns="columns1"
        :otherProps="statisticTables[1]"
    /></TabPane>
  </Tabs>
</template>
<script lang="ts" setup>
import { defineProps, watch, ref, onMounted } from "vue";
import { Tabs, TabPane } from "ant-design-vue";
import { getTableFields } from "@/request/interceptor";
import { statisticTableField } from "./config";

const props = defineProps<{
  statisticTables: any;
}>();

const tab0 = "按区县统计";
const tab1 = "按水利分区统计";
const columns0 = ref<any[]>([]);
const columns1 = ref<any[]>([]);

const getColumns = (cols: any[]): any[] => {
  const columns = cols.map((item, index) => {
    return {
      ...item,
      ...statisticTableField.find((field) => field.key === item.dataIndex),
    };
  });
  return columns;
};

const updateDataSource = () => {
  Promise.all(
    props.statisticTables.map((item) => {
      return getTableFields(item.tablename);
    })
  ).then(([value0, value1]) => {
    columns0.value = getColumns(value0);
    columns1.value = getColumns(value1);
  });
};

onMounted(() => {
  updateDataSource();
});

watch(
  () => props.statisticTables,
  () => {
    updateDataSource();
  }
);
</script>

<style lang="scss" scoped></style>
