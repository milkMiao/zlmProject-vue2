<template>
  <!-- <div v-html="config.callback && config.callback(config)">qqqq</div> -->
  <div>function----index.vue 函数动态组件--业务</div>
</template>

<script>
export default {
  name: "ComFunction",
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
      name: "control-Function 动态组件Function",
    };
  },
}
</script>

<style>

</style>