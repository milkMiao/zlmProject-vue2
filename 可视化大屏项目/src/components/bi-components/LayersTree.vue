<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  inject,
  onBeforeUnmount,
  useSlots,
} from "vue";
import {
  Button,
  Modal,
  UploadDragger,
  Space,
  Tree,
  Dropdown,
  Menu,
  MenuItem,
  message,
} from "ant-design-vue";
import { layersController } from "@/controller";
import { getUUID, getLightMapServer } from "@/utils";
import { getTableFields, getData } from "@/request/interceptor";
import { MoreOutlined } from "@ant-design/icons-vue";
import BaseTableXHR from "../common/BaseTableXHR.vue";
import { useGlobalStore } from "@/stores/store";
const defaultCheckedKeys: string[] = [];
const getLayerAttr: any = inject("getLayerAttr");
const props = defineProps<{
  layers: any;
  cacheLayers: false;
}>();
const emit = defineEmits<{
  (event: 'handleSelect', selectData: any, currentData: any, isChecked: boolean): void
}>()
const slots = useSlots();
defineExpose({
  handleMenuClick: handleMenuClick,
});
const globalStore = useGlobalStore();
const layers = props.layers;

function getCheckedKeys(treeData: any, checkedKeys: string[]) {
  treeData.map((item: any) => {
    if (item.children) {
      getCheckedKeys(item.children, checkedKeys);
    } else {
      if (item.show) {
        checkedKeys.push(item.key);
        //图层不存在时允许添加
        if (!layersController.hasKey(item.key)) {
          layersController.add({
            type: "tile",
            ...item,
          });
        }
      }
    }
  });
}

function getAllLeafs(treeData: any, expandLeafs: string[]) {
  treeData.map((item: any) => {
    if (item.children) {
      getAllLeafs(item.children, expandLeafs);
    } else {
      expandLeafs.push(item);
    }
  });
}

function getItemByKey(treeData: any, selectedKey: string): any {
  const allLeafs: string[] = [];
  getAllLeafs(treeData, allLeafs);

  return allLeafs.find((item: any) => item.key === selectedKey);
}

//通过属性图key展示表格
function showTableDetailsByKey(selectedKey: string) {
  const item = getItemByKey(layers, selectedKey);
  showTableDetails(item);
}
//直接通过表格展示表名
function showTableDetails(item: any) {
  if (!item.tablename) {
    message.warn("请选择表名！");
    return;
  }
  // getTableFields('subdistrict').then((columns) => {
  getTableFields(item.tablename).then((columns) => {
    if (columns.length > 0) {
      getLayerAttr({
        name: item.name,
        columns,
        otherProps: item,
        component: BaseTableXHR,
      });
    }
  });
}

function toggleByKey(item: any, checked: boolean) {
  if (layersController.hasKey(item.key)) {
    layersController.toggleByKey(item.key, checked);
  } else {
    //图层不存在需要添加图层
    layersController.add({
      type: "tile",
      ...item,
    });
  }
}

//判断图层是否也叶子节点统一更新 TODO:多层级可能存在问题
function updateLayerStatus(dataRef: any, checked: boolean) {
  if (dataRef.children && dataRef.children.length > 0) {
    dataRef.children.map((item: any) => {
      if (item.children && item.children.length > 0) {
        updateLayerStatus(item.children, checked);
      } else {
        toggleByKey(item, checked);
      }
    });
  } else {
    toggleByKey(dataRef, checked);
  }
}

function handleCheck(_, e) {
  const checked = e.checked;
  emit('handleSelect', e.checkedNodes, e.node.dataRef, e.checked)
  updateLayerStatus(e.node.dataRef, e.checked);
}

function handleMenuClick({ key }: { key: string }, item: any) {
  if (key === "showTable") {
    showTableDetails(item);
  }
}

function handleSelect(selectedKeys, e) {
  if (e.node.dataRef.leaf) {
    globalStore.updateActiveLayer(e.node.dataRef);
  }
}
getCheckedKeys(layers, defaultCheckedKeys);

const selectedKeys = ref<string[]>([]);
const checkedKeys = ref<string[]>(defaultCheckedKeys);

watch(selectedKeys, () => { });
watch(checkedKeys, () => { });

onBeforeUnmount(() => {
  if (props.cacheLayers) {
    //缓存不移除已添加图层
  } else {
    layersController.removeAll();
  }
});
</script>

<template>
  <div class="custom-tree">
    <Tree blockNode :showLine="true" :draggable="true" :showIcon="false" @select="handleSelect" v-model:selectedKeys="selectedKeys" v-model:checkedKeys="checkedKeys" checkable defaultExpandAll :tree-data="layers" @check="handleCheck">
      <template #title="{ name, key, leaf, dataRef }">
        <div>
          {{ name }}
          <span v-if="slots.moreInfo" class="more-info">
            <slot name="moreInfo" :data="{ name, key, leaf, dataRef }"></slot>
          </span>
          <span v-else class="more-info">
            <Dropdown v-if="leaf" :trigger="['click']">
              <span @click.stop.prevent>
                <MoreOutlined />
              </span>
              <template #overlay>
                <Menu @click="(e) => handleMenuClick(e, dataRef)">
                  <MenuItem key="zooTo"> 缩放至 </MenuItem>
                  <MenuItem key="reName"> 重命名 </MenuItem>
                  <MenuItem key="showTable"> 显示属性表 </MenuItem>
                </Menu>
              </template>
            </Dropdown>
            <slot v-else name="noLeaf" :info="dataRef"></slot>
          </span>
        </div>
      </template>
    </Tree>
  </div>
</template>

<style scoped>
.more-info {
  float: right;
}

.custom-tree >>> .ant-tree .ant-tree-treenode {
  /* width: 100%; */
}

.custom-tree >>> .ant-tree .ant-tree-node-content-wrapper {
  width: calc(100% - 50px);
}
</style>
