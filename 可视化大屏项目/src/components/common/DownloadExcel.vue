<template>
  <Button type="primary" shape="round" @click="handleDownloadClick">
    <template #icon>
      <DownloadOutlined />
    </template>
    下载
  </Button>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
import { defineProps } from "vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
import { createDownloadExcelUrlByTableName, downloadFile } from "@/utils";

const props = defineProps({
  tablename: String,
  fields: {
    type: Array,
    default: () => {
      return [];
    },
  },
  filename: {
    type: String,
  },
});

function handleDownloadClick() {
  const { tablename, fields, filename } = props;
  if (tablename) {
    const url = createDownloadExcelUrlByTableName(
      tablename,
      fields,
      filename ?? tablename
    );
    downloadFile(url);
  }
}
</script>

<style scoped lang="scss"></style>
