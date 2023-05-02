<script lang="ts" setup>
import { ref, watch } from "vue";
import {
  Steps,
  Step,
  Button,
  Modal,
  UploadDragger,
  Space,
  Result,
  message,
} from "ant-design-vue";
import {
  UploadOutlined,
  InboxOutlined,
  SmileTwoTone,
  ExperimentOutlined,
} from "@ant-design/icons-vue";
import LocDataList from "./LocDataList.vue";
import { registerLocFile } from "../../request/services";

const visible = ref(false);
const locListRef = ref(null);

const uploadFileList = ref<any[]>([]);
const current = ref(0);

const steps = [
  {
    title: "LOC文件上传",
    key: "0",
  },
  {
    title: "LOC文件解析",
    key: "1",
  },
  {
    title: "完成",
    key: "2",
  },
];
const showModal = () => {
  visible.value = true;
};

const handleOk = () => {
  visible.value = false;
  if (!!locListRef) {
    locListRef.value.updateLocList();
  }
};

const parser = () => {
  const list = uploadFileList.value;
  registerLocFile(list[0].name, list[0].name)
    .then((res) => {
      current.value = 2;
    })
    .catch((err) => {
      message.error(JSON.stringify(err));
    });
};

const remove = () => {
  uploadFileList.value = [];
};

watch(uploadFileList, () => {
  const fileList = uploadFileList.value;
  if (fileList.length > 0) {
    if (fileList[0].status === "done") {
      current.value = 1;
    }
  }
});
</script>

<template>
  <div class="model-data-select">
    <CustomAside>
      <template #body>
        <LocDataList ref="locListRef" />
      </template>
      <template #footer>
        <Button type="primary" shape="round" @click="showModal">
          <template #icon>
            <UploadOutlined></UploadOutlined>
          </template>
          添加模型数据
        </Button>
      </template>
    </CustomAside>
    <Modal
      :visible="visible"
      title="添加模型数据"
      :footer="null"
      @ok="handleOk"
      @cancel="handleOk"
    >
      <div class="steps-content">
        <UploadDragger
          v-if="current === 0"
          name="uploadFile"
          v-model:fileList="uploadFileList"
          :multiple="true"
          accept=".loc,.LOC"
          action="/api/upload"
          @remove="remove"
          :withCredentials="true"
          :maxCount="1"
          method="post"
        >
          <p class="ant-upload-drag-icon">
            <InboxOutlined></InboxOutlined>
          </p>
          <p class="ant-upload-text">点击或拖拽文件到当前区域</p>
          <p class="ant-upload-hint">支持LOC文件</p>
        </UploadDragger>
        <div v-else-if="current === 1">
          <Result title="LOC文件解析入库" :style="{ padding: 0 }">
            <template #icon>
              <ExperimentOutlined />
            </template>
            <template #extra>
              <Button type="primary" @click="parser">解析</Button>
            </template>
          </Result>
        </div>
        <div v-else>
          <Result title="恭喜, LOC文件解析成功!" :style="{ padding: 0 }">
            <template #icon>
              <SmileTwoTone />
            </template>
          </Result>
        </div>
      </div>
      <Steps v-model:current="current">
        <Step v-for="item in steps" :key="item.title" :title="item.title" />
      </Steps>
      <!-- <div><span>分析方案名称:</span><Input @change="onChangeFileName" /></div> -->
    </Modal>
  </div>
</template>

<style scoped>
.model-data-select {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.steps-content {
  margin-bottom: 40px;
  height: 200px;
}

.model-data-select >>> .ant-result {
  padding: 0;
}
</style>
