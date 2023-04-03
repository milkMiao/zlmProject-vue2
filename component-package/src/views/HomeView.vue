<template>
  <div class="table">
    <!-- 封装表格 -->
    <ATable :column="column" :index="1" :checkbox="true"> 
      <!-- 插槽作用：
        1、渲染数据 ；
        2、作用域插槽传输数据-将子组件内容传递给父组件；【如：操作栏-编辑按钮，内容传递给弹出栏；】
      -->
      <template v-slot:operation="slot"> <!-- slot自定义名称 -->
        {{slot.data.name}}
        <el-button>详情</el-button>
        <el-button type="primary" @click="jumn(slot.data)">编辑</el-button>
        <el-button type="danger">删除</el-button>
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
  methods: {
    //编辑
    jumn(row){
      console.log("编辑---", row)
    }
  },
};
</script>
