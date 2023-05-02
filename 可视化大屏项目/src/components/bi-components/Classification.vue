<template>
  <div class="classification">
    <Popover
      :title="typeEnum[type]"
      trigger="click"
      placement="left"
      arrowPointAtCenter
      overlayClassName="grade-popover"
    >
      <div class="inner-content">
        <span class="label"> {{ typeEnum[type] }} </span>
        <span class="grade"></span>
      </div>
      <template #content>
        <div class="cls-content">
          <Tabs v-model:activeKey="activeKey" size="small">
            <TabPane key="1" tab="统一">
              <SelectColorOrIcon v-model:checkedSymbol="checkedSymbol" />
            </TabPane>
            <TabPane key="2" tab="按字段">
              <div class="field-color-config">
                <ASelect
                  v-model:value="selectField"
                  style="width: 100%"
                  placeholder="请选择字段"
                  :options="options"
                ></ASelect>
                <SelectColorOrIconList :field="selectField" />
              </div>
            </TabPane>
          </Tabs>
        </div>
        {{ checkedSymbol }}
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, watchEffect, watch, toRaw } from "vue";
import { Popover, Tabs, TabPane } from "ant-design-vue";
import SelectColorOrIcon from "./SelectColorOrIcon.vue";
import SelectColorOrIconList from "./SelectColorOrIconList.vue";
import { useGlobalStore } from "@/stores/store";
import { queryTableField } from "@/request/services";
import { lightServerTileStyle, getLightMapServer, getUUID } from "@/utils";
import { layersController } from "@/controller";
import qs from "qs";

const typeEnum = {
  color: "颜色",
  size: "大小",
};

const props = defineProps<{
  type: string; //color,size
  fields: any[];
}>();

const activeKey = ref<string>("1");
const selectField = ref<string>(null);
const options = ref<any[]>([]);
const checkedSymbol = ref<any>({});
const globalStore = useGlobalStore();

watchEffect(() => {
  options.value = props.fields.map((item) => {
    return {
      label: item.title,
      value: item.dataIndex,
    };
  });
  selectField.value = props?.fields.length && props.fields[0].dataIndex;
});

watchEffect(() => {
  if (globalStore?.activeLayer?.tablename) {
    queryTableField(globalStore.activeLayer.tablename, props.field).then(
      (res) => {
        console.log(res);
      }
    );
  }
});

watch(checkedSymbol, () => {
  const styleConfig = lightServerTileStyle(toRaw(checkedSymbol.value));
  const parseResult = qs.parse(globalStore.activeLayer.url);

  const styleConfigObj = {
    value: "Default",
    ...styleConfig,
  };
  const styles = [];
  for (const key in styleConfigObj) {
    if (Object.prototype.hasOwnProperty.call(styleConfigObj, key)) {
      styles.push(`${key}:${styleConfigObj[key]}`);
    }
  }

  parseResult.styleconfig = styles.join(",");
  //符号化的结果
  const resultUrl = qs.stringify(parseResult);
  const testLayer = {
    ...toRaw(globalStore.activeLayer),
    key: getUUID(),
    url: resultUrl,
  };
  console.log(testLayer);
  layersController.add(testLayer);
});
</script>

<style scoped lang="scss">
.classification {
  margin: 0 15px 10px 15px;
  display: flex;
}

.inner-content {
  display: flex;
  width: 100%;
  .label {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    background-color: #1585ff;
    width: 50px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    border-radius: 6px 0 0 6px;
  }

  .grade {
    background-color: #fff;
    flex: 1;
    cursor: pointer;
    &:hover {
      border: 1px solid #ccc;
    }
  }
}

.cls-content {
  width: 276px;

  ::v-deep .ant-tabs .ant-tabs-nav {
    margin: 0;
  }

  .field-color-config {
    margin: 10px;
  }
}
</style>
