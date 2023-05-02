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
  <LayoutSider :theme="theme" :collapsed="collapsed" :width="viewConfig.props.width" :collapsedWidth="viewConfig.props.collapsedWidth ?? 0">
    <!-- <div class="header clearfix">
      <span>
        {{ title }}
      </span>
      <span class="right" @click="collapse">
        <CloseCircleOutlined />
      </span>
    </div> -->
    <!-- <div class="body">
      <KeepAlive :max="10"> -->
        <Component :is="viewConfig.component"></Component>
      <!-- </KeepAlive>
    </div> -->
  </LayoutSider>
</template>

<style scoped>
.header {
  border-bottom: 1px solid #ddd;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  position: relative;
}

.header .right {
  position: absolute;
  right: 1em;
  cursor: pointer;
}

.header .right:hover {
  color: #218bff;
  transform: scale(1.2);
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.header,
.body {
  white-space: nowrap;
}

.body {
  background-color: #f8f8f8;
  height: calc(100% - 46.2px);
}
</style>
