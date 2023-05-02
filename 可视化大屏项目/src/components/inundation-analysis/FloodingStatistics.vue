<template>
  <div class="flood-statistic">
    <List itemLayout="horizontal" :dataSource="statisticList">
      <template #renderItem="{ item }">
        <ListItem
          :style="
            currentChecked && currentChecked.name === item.name
              ? { 'background-color': '#e2f6ff' }
              : {}
          "
        >
          <ListItemMeta :description="`创建时间：${item.createTime}`">
            <template #title>
              <a @click="() => handleCheckedItem(item)">{{ item.name }}</a>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
    <Modal
      :visible="visible"
      class="full-modal"
      :footer="null"
      @ok="handleOk"
      @cancel="handleOk"
    >
      <template #title>
        <div>
          受淹地物统计汇总
          <span class="right-btn"><ArrowsAltOutlined /></span>
        </div>
      </template>
      <div class="steps-content">
        <div v-if="current === 0">
          <Form
            :model="formState"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            autocomplete="off"
          >
            <CustomFormItems
              :formState="formState"
              :groups="floodStatisticsConfig"
            />
          </Form>
        </div>
        <div v-else></div>
      </div>
      <Steps v-model:current="current">
        <Step v-for="item in steps" :key="item.title" :title="item.title" />
      </Steps>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  List,
  ListItem,
  ListItemMeta,
  Steps,
  Step,
  Button,
  Modal,
  Result,
} from "ant-design-vue";
import CustomFormItems from "./components/CustomFormItems.vue";
import {
  SmileTwoTone,
  ExperimentOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons-vue";
import { getStatisticList } from "./services";
import { floodStatisticsConfig } from "./config";

const statisticList = ref<any[]>([]);
const currentChecked = ref<any>(null);
const visible = ref(false);
const current = ref(0);
const formState = ref<any>({});
const steps = [
  {
    title: "受淹方案选择",
    key: "0",
  },
  {
    title: "统计",
    key: "1",
  },
];

function handleCheckedItem(checkedItem: any) {
  currentChecked.value = checkedItem;
  visible.value = true;
}

function updateList() {
  return getStatisticList().then((value: any[]) => {
    statisticList.value = value;
  });
}

const handleOk = () => {
  visible.value = false;
};

onMounted(updateList);
</script>

<style lang="scss" scoped>
.flood-statistic {
  cursor: pointer;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;

  .ant-list-item-meta {
    align-items: center;
  }

  .ant-list-item {
    padding: 8px 20px;
  }
}

.steps-content {
  margin-bottom: 40px;
  min-height: 400px;
}

.full-modal {
  .right-btn {
    &:hover {
      color: #1585ff;
      cursor: pointer;
    }
  }
}
</style>
