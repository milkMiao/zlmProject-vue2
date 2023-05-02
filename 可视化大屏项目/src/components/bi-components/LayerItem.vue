<template>
  <div class="item" @click="onViewMetaData">
    <div class="title">
      <span> {{ props.data.name }} </span>
    </div>
    <div
      class="operation"
      @click="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleLayer(props.data);
        }
      "
    >
      <EyeOutlined v-if="props.data.layer.show" />
      <EyeInvisibleOutlined v-else="props.data.layer.show" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, inject } from "vue";
import { Drawer, Table } from "ant-design-vue";
import { getTablefield, queryTableMeta } from "@/request/services";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";

const props = defineProps<{
  data: any;
}>();

const show = ref(false);
const visible = ref(false);
const columns = ref([]);
const datas = ref([]);
const getLayerAttr: any = inject("getLayerAttr");

const toggleLayer = (data: any) => {
  data.layer.show = !data.layer.show;
};

const showDrawer = () => {
  visible.value = true;
};
const onClose = () => {
  visible.value = false;
};
const onViewMetaData = () => {
  queryTableMeta(props.data.name).then((res: any) => {
    datas.value = res.Data;
    showDrawer();
    getLayerAttr({
      title: props.data.name,
      columns,
      datas,
    });
  });
};
const getContainer = () => {
  return document.getElementById("cesium-container");
};
onMounted(() => {
  getTablefield(props.data.name).then((res: any) => {
    let fields = res
      .filter((item) => item.field_name !== "geom")
      .map((item: any, index: number) => {
        return {
          dataIndex: item.field_name,
          title: item.field_name,
          key: `column-${index}`,
          // width: 200,
          ellipsis: true,
        };
      });
    columns.value = fields;
  });
});
</script>

<style lang="scss" scoped>
.item {
  overflow: hidden;
  position: relative;
  white-space: normal;
  background-color: #fff;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 4px;

  &:hover {
    border-left: 2px solid #1585ff;
    border-right: 2px solid #1585ff;
  }
  .title {
    font-size: 14px;
    position: relative;

    .base-operation {
      position: absolute;
      right: 5px;
    }
  }
  .operation {
    height: 100%;
    width: 40px;
    right: 0;
    position: absolute;
    font-size: 12px;
    color: #999;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
  }
}
</style>
