<template>
  <div class="block">
    <div class="group-header">
      <span class="left-icon" @click="collapsed = !collapsed">
        <RightOutlined v-if="collapsed" />
        <DownOutlined v-else />
      </span>
      <span>{{ props.data.name }}</span>
    </div>
    <div ref="dom" class="group-content" :style="{
        height: !collapsed ? `fit-content` : 0,
        opacity: !collapsed ? 1 : 0,
      }">
      <slot></slot>
      <!-- slot传值 -->
      <!-- <Item v-for="item in props.data.children" :key="item.id" :data="item" /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { ref, onMounted } from "vue";
import Item from "../bi-components/LayerItem.vue";
import Sortable from "sortablejs";
import { RightOutlined, DownOutlined } from "@ant-design/icons-vue";

const props = defineProps<{
  data: any;
}>();

const dom: Ref<HTMLDivElement> = ref(null) as any;
const collapsed = ref(false);
onMounted(() => {
  new Sortable(dom.value, {
    group: "shared",
    animation: 150,
    ghostClass: "blue-background-class",
    onEnd: function (evt: any) {
      // const pullMode = evt.pullMode;
      // const oldIndex = evt.oldIndex;
      // const newIndex = evt.newIndex;
      // let oldList = evt.target.list.children;
      // let newList = evt.to.list.children;
      // if (pullMode) {
      //   // 移动至toList并去除旧数据
      //   newList.splice(newIndex, 0, oldList[oldIndex]);
      //   oldList.splice(oldIndex, 1);
      // } else {
      //   // 同List位置修改
      //   const tem = oldList[oldIndex];
      //   oldList[oldIndex] = oldList[newIndex];
      //   oldList[newIndex] = tem;
      //   console.log(oldList[0]);
      // }
    },
  });
});
</script>

<style lang="scss" scoped>
.block {
  width: 100%;
  .group-header {
    padding: 0 10px;
    font-size: 16px;
    margin-bottom: 15px;
  }

  .group-content {
    padding: 0 20px;
    overflow: hidden;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .left-icon {
    margin-right: 5px;
  }
}
</style>
