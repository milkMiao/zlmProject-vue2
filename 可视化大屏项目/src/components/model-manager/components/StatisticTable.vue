<template>
  <Tabs>
    <TabPane
      v-for="(item, index) in statisticTables"
      :key="item.key"
      :tab="item.name"
    >
      <BaseTableXHR
        :name="item.name"
        :columns="columns[index]"
        :otherProps="{
          ...statisticTables[index],
          editable: otherProps?.editable ?? false,
        }"
      />
    </TabPane>
  </Tabs>
</template>
<script lang="ts" setup>
import { defineProps, watch, ref, onMounted } from "vue";
import { Tabs, TabPane } from "ant-design-vue";
import { getTableFields } from "@/request/interceptor";

const props = defineProps<{
  statisticTables: any;
  otherProps: any;
}>();

const columns = ref<any>({});

const updateDataSource = () => {
  Promise.all(
    props.statisticTables.map((item) => {
      return getTableFields(item.tablename);
    })
  ).then((newColumns) => {
    columns.value = newColumns;
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
