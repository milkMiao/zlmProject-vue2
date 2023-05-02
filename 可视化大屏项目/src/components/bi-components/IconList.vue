<!--
 * @Author: zhixian
 * @Date: 2022-05-29 11:52:23
 * @Description: 
-->
<template>
  <div class="icons-list">
    <span
      :key="icon.key"
      :class="checkedIcon.key === icon.key && 'checked-icon'"
      v-for="icon in icons"
      @click="$emit('update:checkedIcon', icon)"
    >
      <img
        :src="`/api/service/img/get?filename=${icon.file_name}`"
        :alt="icon.file_name"
        width="30"
        height="30"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";

defineProps<{
  checkedIcon: any;
  icons;
}>();

const handleChange = (icon) => {
  checkedIcon.value = icon;
  onChange(icon);
};
</script>

<style scoped lang="scss">
.icons-list {
  display: flex;
  flex-flow: wrap;
  max-height: 276px;
  overflow: auto;
  margin: 10px;

  > span {
    border: 1px solid #fff;
    background-color: #f8f8f8;
    border-radius: 4px;
    padding: 4px;
    margin: 5px;
    &:hover {
      background-color: #e6f6ff;
      cursor: pointer;
    }
  }

  .checked-icon {
    background-color: #e6f6ff;
    border-color: #218bff;
  }
}
</style>
