<template>
  <div class="table">
    <!-- 封装按钮 -->
    <ATable :column="column"/>
  </div>
</template>

<script>
// import ATable from "@/components/table";  // components: { ATable }

export default {
  name: "HomeView",
  components: {
    'ATable': ()=> import("@/components/table")
  },
  data() {
    return {
      column: [
        { label: "日期", prop: "date" },
        { label: "姓名", prop: "name" },
        { label: "地址", prop: "address" }
      ],
    };
  },
  methods: {},
};
</script>
