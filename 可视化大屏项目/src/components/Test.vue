<script setup lang="ts">
import { getLightMapServerUriByTableName } from "@/utils";

const tablename = "县级行政区_洪水风险";

const reload = () => {
  getLightMapServerUriByTableName(tablename).then((res) => {
    console.log(res);
  });
};
</script>

<template>
  <div class="test-panel">
    <a @click="reload">reload</a>
  </div>
</template>

<style scoped lang="scss">
.test-panel {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: blue;
  z-index: 999999;
}
</style>
