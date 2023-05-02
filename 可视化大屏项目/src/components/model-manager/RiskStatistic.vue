<!--
 * @Author: zhixian
 * @Date: 2022-06-05 17:43:57
 * @Description: 
-->
<template>
  <CustomAside>
    <template #body>
      <BaseForm
        :form="riskStatisticForm"
        :model="riskStatistic"
        labelAlign="left"
        :itemLayout="{ labelCol: { span: 10 }, wrapperCol: { span: 14 } }"
      >
      </BaseForm>
    </template>
    <template #footer>
      <Button type="primary" shape="round"> 统计 </Button></template
    >
  </CustomAside>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import moment from "moment";
import {
  CheckboxGroup,
  Checkbox,
  Row,
  Col,
  Button,
  Space,
  message,
} from "ant-design-vue";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";

const riskStatisticForm: Array<IBaseForm> = [
  {
    label: "内容选择",
    key: "contentSelect",
    colon: false,
    type: "select",
    options: [
      {
        label: "超警戒个数",
        key: "超警戒个数",
      },
      {
        label: "超保证个数",
        key: "超保证个数",
      },
    ],
  },
  {
    label: "图表形式",
    key: "chartsType",
    colon: false,
    type: "select",
    options: [
      {
        key: "bar",
        label: "柱状图",
      },
      {
        key: "pie",
        label: "饼状图",
      },
      {
        key: "line",
        label: "折线图",
      },
      {
        key: "stack",
        label: "堆叠图",
      },
    ],
  },
  {
    label: "区域选择",
    key: "citySelect",
    colon: false,
    type: "select",
    options: [
      {
        key: "sh",
        label: "上海",
      },
      {
        key: "jx",
        label: "嘉兴",
      },
      {
        key: "js",
        label: "嘉善",
      },
      {
        key: "all",
        label: "全域",
      },
    ],
  },
];

const riskStatistic = ref({
  contentSelect: "超警戒个数",
  chartsType: "柱状图",
  citySelect: "上海",
});
</script>

<style scoped>
.info {
  float: right;
}
</style>
