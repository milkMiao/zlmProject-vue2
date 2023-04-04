<template>
  <div>text----index.vue文本动态组件--业务</div>
</template>
  
  <script>
export default {
  name: "ComText",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: "control-Text 动态组件文本",
    };
  },
};
</script>
  
  <style>
</style>