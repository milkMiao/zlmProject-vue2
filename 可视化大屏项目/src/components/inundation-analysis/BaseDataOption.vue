<template>
  <CustomAside>
    <template #body>
      <LayersTree v-if="layers.length" :layers="layers" />
      <Button style="margin-top:20px;" type="primary" shape="round" ghost @click="showModal" :loading="loading">
        分析
      </Button>
    </template>
  </CustomAside>
  <InundationConfig ref="inunConf" style="width:40%;" v-model:visible="visible" :checkedLoc="bzStore.checkedLoc" />

  <!-- <Modal v-model:visible="visible" title="淹没叠置分析" okText="统计" :ok="handleOk" :width="600" :bodyStyle="{ 'padding-top': 0 }">
  </Modal> -->
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Button, Modal, message } from "ant-design-vue";
import LayersTree from "@/components/bi-components/LayersTree.vue";
import InundationConfig from "./InundationConfig.vue";
import { basicLayers } from "./config";
import { excuteFMEService } from "../../request/services";
import { useInundationStore } from "./stores";
const visible = ref(false);
const inunConf = ref(null);
const loading = ref(false);

const layers = ref([]);

onMounted(() => {
  setTimeout(() => {
    layers.value = basicLayers
  }, 1000);
})

const bzStore = useInundationStore();
function showModal() {
  visible.value = true;
}
function cancelModal() {
  visible.value = false;
}

function handleOk() {
  if (!!inunConf?.value) {
    inunConf.value?.submit().then((formData) => {
      analysis(formData);
    });
  }
}

const analysis = (formData) => {
  if (bzStore.checkedLoc) {
    loading.value = true;
    excuteFMEService(bzStore.checkedLoc.name)
      .then((data) => {
        if (data?.job_status === "failed") {
          message.error(`${data?.job_comment}`);
          loading.value = false;
        } else {
          if (data?.job_status === "running") {
            visible.value = false;
          }
        }
      })
      .catch(() => {
        loading.value = false;
      });
  }
};
//const getAnalysisCompleteStatus = (job_id) => {
// qureyJobs(`job_id='${job_id}'`).then((res) => {
//   if (res.job_process === "finished") {
//     clearInterval(interval.value);
//     spinning.value = false;
//     if (res.job_status === "success") {
//       message.success(`分析完成！`);
//       props.onClose();
//     } else {
//       message.error(`${res?.job_comment}`);
//     }
//   }
// });
//};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 50%;
  transform: translateX(50%);
  top: 30px;
}
</style>
