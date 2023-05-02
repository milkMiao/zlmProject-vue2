<template>
  <CustomAside style="background: transparent">
    <template #body>
      <BaseForm ref="baseFormRef" :form="timeSettingForm" :rules="timeSettingRules" :model="timeSettingModel" labelAlign="rihgt" :itemLayout="{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }">
        <!-- <template #currentTime>
          <AFormItem label="当前时间" name="currentTime">
            {{ moment().format("YYYY-MM-DD HH:mm:ss") }}
          </AFormItem>
        </template> -->
      </BaseForm>
    </template>
    <!-- <template #footer>
      <Button type="primary" shape="round" danger> 实时调度计算 </Button>
      <Button type="primary" shape="round" @click="hisResultExtractFn"> 历史成果提取 </Button>
    </template> -->
  </CustomAside>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, onActivated, Ref, watch } from "vue";
import { getModelToken } from "./utils/work";
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
import {
  getModelLatestTmApi,
  getResultTimeListApi,
  hisResultExtractApi,
} from "./services";
import { useModelStore } from "./stores";

const bzStore = useModelStore();
const baseFormRef = ref();
const timeSettingForm: Ref<Array<any>> = ref([
  {
    label: "依据时间",
    key: "name",
    colon: true,
    type: "select",
    options: [],
  },
  {
    label: "预见期(天)",
    key: "day",
    colon: true,
    type: "input",
  },
  {
    label: "当前时间",
    key: "currentTime",
    colon: true,
    type: "text",
  },
]);
const timeSettingRules = {
  name: [{ required: true, trigger: "blur", message: "依据时间是必填项！" }],
  // currentTime: [{ required: true, trigger: 'blur', message: '当前时间是必选项！' }],
};
const timeSettingModel = ref({
  name: "",
  day: "",
  currentTime: "",
});
defineExpose({
  hisResultExtractFn: hisResultExtractFn
})
onActivated(() => {
  //TODO: 待调整
  // getModelToken()
});
watch(
  () => bzStore.modelToken,
  (data) => {
    if (data) {
      getResultTimeList();
      getModelLatestTm();
    }
  },
  {
    immediate: true,
  }
);
function getModelLatestTm() {
  getModelLatestTmApi()
    .then((res) => {
      if (res.code === 0) {
        timeSettingModel.value.currentTime = res.data.tm;
      }
    })
    .catch((err) => {
      message.success("当前时间获取失败！");
    });
}
function getResultTimeList() {
  getResultTimeListApi()
    .then((res) => {
      if (res.code === 0) {
        const arr: any = [];
        res.data.tm?.mdateTime.forEach((element) => {
          arr.push({
            label: moment(element).format("yyyy-MM-DD HH:mm:ss"),
            key: element,
          });
        });
        timeSettingForm.value[0].options = arr;
      }
    })
    .catch((err) => {
      message.success("依据时间获取失败！");
    });
}
async function hisResultExtractFn() {
  const validate = await baseFormRef.value.validate();
  if (!validate) return;
  hisResultExtractApi({ mDateTime: timeSettingModel.value.name })
    .then((res) => {
      if (res.code === 0) {
        message.success("成功！");
      } else {
        message.success("失败！");
      }
    })
    .catch((res) => {
      message.success("失败！");
    });
}
</script>

<style scoped>
.info {
  float: right;
}
</style>
