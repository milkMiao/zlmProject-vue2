<template>
  <div class="aside">
    <section class="body scrollbar">
      <slot name="body"></slot>
    </section>
    <section class="footer" v-if="slots.footer">
      <Space>
        <slot name="footer"></slot>
      </Space>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import { Space } from "ant-design-vue";
const slots = useSlots();
</script>

<style scoped>
.aside {
  overflow: hidden;
  position: relative;
  background-color: transparent;
}

.aside .body {
  height: calc(100% - 80px);
  overflow-y: auto;
  padding: 10px 20px;
}

.aside .footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  padding: 20px;
  box-shadow: 3px 3px 6px 1px rgba(0, 0, 0, 0.3);
}
</style>
