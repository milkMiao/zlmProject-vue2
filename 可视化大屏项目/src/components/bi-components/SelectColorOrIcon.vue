<template>
  <div class="color-or-icon">
    <Tabs v-model:activeKey="activeKey" size="small">
      <TabPane key="1">
        <template #tab>
          <span>
            <BgColorsOutlined />
            颜色
          </span>
        </template>
        <ColorPicker v-model:pureColor="pureColor" isWidget />
      </TabPane>
      <TabPane key="2">
        <template #tab>
          <span>
            <AppstoreAddOutlined />
            图标
          </span>
        </template>
        <IconList
          v-if="!!icons.length"
          :icons="icons"
          v-model:checkedIcon="checkedIcon"
        />
      </TabPane>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  onMounted,
  watchEffect,
  watch,
  defineEmits,
} from "vue";
import { Popover, Tabs, TabPane } from "ant-design-vue";
import { BgColorsOutlined, AppstoreAddOutlined } from "@ant-design/icons-vue";
import { ColorPicker } from "vue3-colorpicker";
import IconList from "./IconList.vue";
import { queryICON } from "@/request/services";
import "vue3-colorpicker/style.css";

interface MapSymbol {
  type: string;
  symbol: any;
}

defineProps<{
  checkedSymbol: MapSymbol;
}>();

const emits = defineEmits(["update:checkedSymbol"]);

const activeKey = ref<string>("1");
const pureColor = ref<any>("red");
const checkedIcon = ref<any>({});
// const gradientColor = ref(
//   "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
// );

const icons = ref<any>([]);

onMounted(() => {
  queryICON().then((newIcons) => {
    icons.value = newIcons.map((item, index) => {
      return {
        key: index,
        ...item,
      };
    });
  });
});

watchEffect(() => {
  console.log(checkedIcon);
});

watch(pureColor, () => {
  emits("update:checkedSymbol", {
    type: "color",
    symbol: {
      color: pureColor.value,
    },
  });
});

watch(checkedIcon, () => {
  emits("update:checkedSymbol", {
    type: "icon",
    symbol: checkedIcon,
  });
});
</script>

<style scoped lang="scss">
.color-or-icon {
  position: relative;
}
</style>
