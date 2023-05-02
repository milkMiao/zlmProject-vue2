<template>
  <Collapse :activeKey="['1', '2']" :bordered="false">
    <template #expandIcon="{ isActive }">
      <CaretRightOutlined :rotate="isActive ? 90 : 0" />
    </template>
    <CollapsePanel key="1" header="水深等级划分">
      <FloodGradeTable />
    </CollapsePanel>
    <CollapsePanel key="2" header="淹没历时划分">
      <FloodGradeTable />
    </CollapsePanel>
  </Collapse>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { Collapse, CollapsePanel } from "ant-design-vue";
import { CaretRightOutlined } from "@ant-design/icons-vue";
import FloodGradeTable from "./FloodGradeTable.vue";
</script>

<style lang="scss" scoped></style>
