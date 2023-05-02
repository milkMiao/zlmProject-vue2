<template>
  <div ref="root" class="layout-container">
    <template :key="block.id" v-for="block in list">
      <Block v-if="block.children" :data="block">
        <DraggableList :list="block.children" :child="child" />
      </Block>
      <Component :is="child" v-else :data="block"></Component>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from "vue";
import { ref, onMounted } from "vue";
import Sortable from "sortablejs";
import Block from "./DraggableBlock.vue";

const root: Ref<HTMLDivElement> = ref(null) as any;

const props = defineProps<{
  list: Array<LayerConfig>;
  child?: any;
}>();

onMounted(() => {
  new Sortable(root.value, {
    group: "root",
    animation: 150,
    onEnd: function (evt: any) {
      console.log(evt);
    },
  });
});
</script>

<style lang="scss" scoped>
.layout-container {
  cursor: pointer;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
}
</style>
