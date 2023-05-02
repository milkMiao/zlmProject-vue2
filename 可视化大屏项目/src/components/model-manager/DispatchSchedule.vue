<!--
 * @Author: zhixian
 * @Date: 2022-06-05 17:59:04
 * @Description: 
-->
<template>
  <div>
    <ATable
      size="small"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
    >
    </ATable>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const columns = [
  {
    title: "序号",
    dataIndex: "order",
    align: "center",
    width: "25%",
  },
  {
    title: "名称",
    dataIndex: "name",
    align: "center",
    width: "25%",
  },
  {
    title: "启用时间",
    dataIndex: "time",
    align: "center",
    width: "25%",
  },
  {
    title: "调度方案",
    dataIndex: "schedule",
    align: "center",
    width: "25%",
  },
];

const dataSource = [
  {
    order: 1,
    name: "杭州塘闸",
    schedule: "关闸关泵",
  },
  {
    order: 2,
    name: "太浦闸",
    time: "8:00:00",
    schedule: "开闸",
  },
  {
    order: 3,
    name: "上塘河闸",
    time: "8:00:00",
    schedule: "关闸关泵",
  },
  {
    order: 4,
    name: "平湖塘枢纽",
    time: "",
    schedule: "开泵",
  },
  {
    order: 5,
    name: "独山枢纽",
    time: "",
    schedule: "开闸",
  },
];
</script>

<style scoped lang="scss">
.risk-analy {
  padding: 10px;
  :deep(.ant-tree-treenode) {
    padding-bottom: 10px;
  }
  :deep(.more-info) {
    float: right;
    .title {
      color: #1890ff;
      cursor: pointer;
    }
  }
  .active {
    color: #1890ff;
  }
  .title {
    cursor: pointer;
    margin-top: 8px;
    transition: all 0.3s;
  }
}
</style>
