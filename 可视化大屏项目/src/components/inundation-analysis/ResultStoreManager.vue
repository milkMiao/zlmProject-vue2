<template>
  <div class="result-store-manager">
    <section class="body">
      <LayersTree v-if="layers.length" :layers="layers">
        <template #noLeaf="data">
          <ShowStatisticTable :data="data" />
        </template>
      </LayersTree>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import LayersTree from "@/components/bi-components/LayersTree.vue";
import ShowStatisticTable from "./ShowStatisticTable.vue";
import { getAnalysisData } from "./services";

const layers = ref([]);

onMounted(() => {
  getAnalysisData().then((value) => {
    layers.value = value;
  });
});
</script>

<style scoped>
.result-store-manager {
  overflow: hidden;
  position: relative;
  text-align: initial;
  padding-bottom: 20px;
}

.result-store-manager .body {
  padding: 0 20px;
}
</style>
