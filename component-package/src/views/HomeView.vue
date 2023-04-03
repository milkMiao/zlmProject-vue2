<template>
  <div class="table">
    <!-- 封装按钮 -->
    <ATable :column="column" :index="1" :checkbox="true"> 
      <template v-slot:operation>
        <el-button type="primary">编辑</el-button>
        <el-button>删除</el-button>
        <!-- <AButton type="primary">编辑</AButton>  自己封装的button组件 -->
      </template>
    </ATable>
  </div>
</template>

<script>
// import ATable from "@/components/table";  // components: { ATable }

export default {
  name: "HomeView",
  components: {
    ATable: () => import("@/components/table"),
    AButton: ()=> import("@/components/button")
  },
  data() {
    return {
      column: [
        {
          type: "function",
          label: "URL地址",
          prop: "url",
          width: 100,
          callback: (data) => {
            console.log("scope.row----function类型", data);
            return `<a href='http://www.web-jshtml.cn'>${data.name}</a>`;
          },
        },
        { label: "日期", prop: "date", width: 200 },
        { label: "姓名", prop: "name" },
        { label: "地址", prop: "address" },
        {
          type: "slot",
          label: "操作",
          prop: "operation",
          slot_name: "operation",
        },
      ],
    };
  },
  methods: {},
};
</script>
