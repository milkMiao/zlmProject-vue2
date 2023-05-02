<template>
  <a @click.stop="showStatisticModal">{{ name }}</a>
</template>
<script lang="ts" setup>
import { defineProps, inject } from "vue";
import StatisticTable from "./StatisticTable.vue";

const getLayerAttr: any = inject("getLayerAttr");
const props = defineProps<{
  data: any;
}>();
const name = "统计";

function showStatisticModal() {
  const {
    info: { statisticTables },
  } = props.data;

  getLayerAttr({
    name,
    component: StatisticTable,
    statisticTables,
    style: {
      height: "550px",
    },
  });
}
</script>

<style lang="scss" scoped></style>
