<template>
  <div class="flood-grade-conf">
    <Table
      size="small"
      :showHeader="false"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
      :rowClassName="getRowClassName"
      v-bind="$attrs"
    >
    </Table>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Table, Button, Input } from "ant-design-vue";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { floodDefaultGrade } from "./config";
const columns = [
  {
    title: "grade",
    dataIndex: "grade",
    width: "30%",
    align: "center",
  },
  // {
  //   title: "type",
  //   dataIndex: "type",
  //   width: "20%",
  //   align: "center",
  // },
  {
    title: "input",
    dataIndex: "input",
    width: "25%",
    align: "center",
  },
  {
    title: "unit",
    dataIndex: "unit",
    align: "center",
  },
];
const dataSource = ref<any[]>(floodDefaultGrade);

const handleAddClick = () => {
  const addRowGrade = dataSource.value.length + 1;
  dataSource.value.push({
    key: addRowGrade,
    name: "水深等级",
    grade: `${addRowGrade}级`,
    type: "水深",
    unit: "米",
  });
};

const handleDeleteClick = () => {
  dataSource.value.pop();
};

const getRowClassName = (record: any, index: number) => {
  return `grade-${index}`;
};
</script>
<style lang="scss" scoped>
.delete-row {
  &:hover {
    color: #1586ff;
    cursor: pointer;
  }
}

.flood-grade-conf {
  ::v-deep .ant-table table {
    .ant-table-tbody {
      @for $i from 0 through 10 {
        .grade-#{$i} {
          background-color: rgba(21, 134, 255, $i/10);
        }
      }
    }
  }
}
</style>
