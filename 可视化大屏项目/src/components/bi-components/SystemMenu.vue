<script setup lang="ts">
import { Menu, MenuItem } from "ant-design-vue";
import menu from "@/config/menu";
import { useMenuStore } from "@/stores/menu";
const menuStore = useMenuStore();
</script>

<template>
  <Menu mode="inline" theme="dark" :selectedKeys="menuStore.selectedKeys" @select="menuStore.changeSelectedKeys" @click="menuStore.changeAsideStatus">
    <MenuItem :key="item.key" v-for="item in menu">
    <template #icon>
      <Icon :icon="item.icon"></Icon>
    </template>
    {{ item.name }}
    </MenuItem>
  </Menu>
</template>

<style></style>
