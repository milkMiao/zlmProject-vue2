<template>
  <CustomAside>
    <template #body>
      <BaseForm
        :form="rainForecastForm"
        :model="rainForecast"
        labelAlign="left"
        :itemLayout="{ labelCol: { span: 10 }, wrapperCol: { span: 14 } }"
      >
      </BaseForm>
    </template>
    <template #footer> </template>
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

const rainForecastForm: Array<IBaseForm> = [
  {
    label: "气象预报",
    key: "meteForecast",
    colon: false,
    type: "switch",
  },
  {
    label: "典型降雨",
    key: "classicRain",
    colon: false,
    type: "switch",
  },
];

const rainForecast = ref({
  meteForecast: false,
  classicRain: false,
});
</script>

<style scoped>
.info {
  float: right;
}
</style>
