<template>
  <div>text----index.vue {{config}}</div>
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