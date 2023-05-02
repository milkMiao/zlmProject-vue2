<script setup lang="ts">
import { Menu, MenuItem } from "ant-design-vue";
import tools from "@/config/tools";

import { useToolsStore } from "@/stores/tools";

const toolsStore = useToolsStore();
</script>

<template>
  <Menu mode="inline" class="system-tools" :selectedKeys="toolsStore.selectedKeys" @select="toolsStore.changeSelectedKeys" @click="toolsStore.changeAsideStatus">
    <MenuItem :key="item.key" v-for="item in tools">
    <template #icon>
      <Icon :icon="item.icon"></Icon>
    </template>
    {{ item.name }}
    </MenuItem>
  </Menu>
</template>

<style>
.system-tools .ant-menu-item::after {
  left: 0;
  right: unset !important;
}

.system-tools .ant-menu-item {
  text-align: center;
}

.system-tools .ant-menu-item .ant-menu-title-content {
  display: none !important;
}

.system-tools .ant-menu-item.ant-menu-item-selected::after {
  transform: scaleY(1);
  opacity: 1;
  transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
