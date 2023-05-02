<template>
  <div :key="item" v-for="item in Object.keys(groups)">
    <Divider v-show="showDivider" orientation="left" orientation-margin="0px" style="color:white;">
      {{ item === "default" ? "" : item +'：'}}
    </Divider>
    <FormItem v-for="col in groups[item]" :label="col.title" :name="col.dataIndex" :rules="col.rules">
      <Component :is="
          col.valueType === 'enum'
            ? Select
            : col.valueType === 'bool'
            ? Switch
            : Input
        " v-model:value="formState[col.dataIndex]" v-model:checked="formState[col.dataIndex]" />
    </FormItem>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";
import { Select, Input, Divider, Form, FormItem, Switch } from "ant-design-vue";

withDefaults(
  defineProps<{
    formState: any;
    showDivider: boolean;
    groups: any;
  }>(),
  {
    showDivider: false,
  }
);
</script>

<style lang="scss" scoped></style>
