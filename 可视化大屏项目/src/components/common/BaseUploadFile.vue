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
} from "@ant-design/icons-vue"
import { registerLocFile, shpImportDB, unzipShp } from "../../request/services";
import moment from 'moment'
const props = defineProps({
  isInit: Boolean
})
const uploadFileList = ref<any[]>([]);
const current = ref(0);
const spinning = ref(false)
const spinTip = ref('')
const steps = [
  {
    title: "文件上传",
    key: "0",
  },
  {
    title: "文件解析",
    key: "1",
  },
  {
    title: "完成",
    key: "2",
  },
];
watch(() => props.isInit, (data) => {
  if (data) {
    current.value = 0
    uploadFileList.value.length = 0
    spinning.value = false
    spinTip.value = ''
  }
}, {
  deep: true
})
// 解析分为两个步骤：1、zip文件解压，2、shp解压入库
const parser = async () => {
  const list = uploadFileList.value
  spinning.value = true
  const fileObj = await unzip(list) as any
  if (fileObj.result === 'success') {
    const result = await importDB(fileObj.path, list) as any
    if (result?.result === 'success') {
      current.value = 2
    }
  }
  spinning.value = false
  // registerLocFile(list[0].name, list[0].name)
  //   .then((res) => {
  //     current.value = 2;
  //   })
  //   .catch((err) => {
  //     message.error(JSON.stringify(err));
  //   });
};
async function unzip(files: Array<File>) {
  spinTip.value = "文件解压中......"
  // return await unzipShp('中国省级行政区划_shp.zip').then(res => {
  return await unzipShp(files[0].name).then(res => {
    return res
  }).catch(err => {
    message.error(JSON.stringify(err))
  })
}
async function importDB(shpPath: string, files: Array<File>) {
  spinTip.value = "文件解压入库中......"
  const tableName = files[0].name.replace('.zip', '').replace(/\./g, '') + '_' + moment().format("yyyyMMDDHHmmss")
  return await shpImportDB(shpPath, tableName).then(res => {
    return res
  }).catch(err => {
    message.error(JSON.stringify(err))
  })
}
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
    <div class="steps-content">
      <UploadDragger v-if="current === 0" name="uploadfile" v-model:fileList="uploadFileList" :multiple="true" accept=".zip" action="/api/upload" @remove="remove" :withCredentials="true" :maxCount="1" method="post">
        <p class="ant-upload-drag-icon">
          <InboxOutlined></InboxOutlined>
        </p>
        <p class="ant-upload-text">点击或拖拽文件到当前区域</p>
        <p class="ant-upload-hint">支持shp文件(必须使用zip压缩,压缩文件内不能有文件夹，否则解析不了)</p>
      </UploadDragger>
      <div v-else-if="current === 1">
        <a-spin :tip="spinTip" :spinning="spinning">
          <Result title="shp文件解析入库" :style="{ padding: 0 }">
            <template #icon>
              <ExperimentOutlined />
            </template>
            <template #extra>
              <Button type="primary" @click="parser">解析入库</Button>
            </template>
          </Result>
        </a-spin>
      </div>
      <div v-else>
        <Result title="恭喜, shp文件解析入库成功!" :style="{ padding: 0 }">
          <template #icon>
            <SmileTwoTone />
          </template>
        </Result>
      </div>
    </div>
    <Steps :current="current">
      <Step v-for="item in steps" :key="item.title" :title="item.title" />
    </Steps>
    <!-- <div><span>分析方案名称:</span><Input @change="onChangeFileName" /></div> -->
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