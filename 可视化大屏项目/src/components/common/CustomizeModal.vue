<script setup lang="ts">
import { withDefaults, toRefs, markRaw } from "vue";
import { LayoutSider } from "ant-design-vue";
import { CloseCircleOutlined } from "@ant-design/icons-vue";

const props = withDefaults(
  defineProps<{
    collapsed: boolean;
    theme: string;
    title: string;
    viewConfig: ViewConfig;
  }>(),
  {}
);

const emits = defineEmits<{
  (e: "collapse", collapsed?: boolean): void;
}>();

const collapse = () => {
  emits("collapse");
};

// const { collapsed, viewConfig, title, theme } = toRefs(props);
</script>

<template>
  <base-modal
    :width="viewConfig.props.width"
    :visible="collapsed"
    @cancel="collapse"
    @ok="collapse"
    :title="viewConfig.title"
  >
    <KeepAlive :max="10">
      <Component :is="viewConfig.component"></Component>
    </KeepAlive>
  </base-modal>
</template>

<style scoped></style>
