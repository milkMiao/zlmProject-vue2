<template>
  <div class="table">
    <!-- 封装表格 -->
    <h2>表格1---</h2>
    <ATable
      ref="table"
      :onLoad="false"
      @onload="onload"
      :initRequest="false"
      :column="column"
      :index="1"
      :checkbox="true"
      :url="'/api/name/'"
      :method="'post'"
      :format="formatData"
    >
      <!-- 插槽作用：
        1、渲染数据 ；
        2、作用域插槽传输数据-将子组件内容传递给父组件；【如：操作栏-编辑按钮，内容传递给弹出栏；】
      -->
      <!-- slot自定义名称 -->
      <template v-slot:operation="slot">
        {{ slot.data.id }}
        <el-button>详情</el-button>
        <el-button type="primary" @click="jumn(slot.data)">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </ATable>

    <h2>表格2---</h2>
    <el-button @click="getCheckList">数据测试</el-button>
    <!-- 
      :check_list.sync="check_list" 方法1
      @selectChange="selectChange"  方法2
    -->
    <ATable
      :check_list.sync="check_list"
      :column="column_fruit"
      :index="1"
      :checkbox="true"
      :url="'/api/fruit/'"
      :method="'post'"
      :data="data_1"
      :params="params_1"
    >
      <!-- 接口参数params--问号后边的，http://localhost:8080/api/fruit/?name=haha -->
      <template v-slot:operation="slot">
        {{ slot.data.id }}
        <el-button type="primary" @click="jumn(slot.data)">编辑</el-button>
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
    AButton: () => import("@/components/button"),
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
            // console.log("scope.row----function类型", data);
            return `<a href='http://www.web-jshtml.cn'>${data.name}</a>`;
          },
        },
        //远程排序，sort设置成column即可，@sort-change事件【当表格的排序条件发生变化的时候会触发该事件】
        // sort_by: 指定数据按照哪个属性进行排序 【sortable 设置为 true 且没有设置 sort-method 的时候有效】
        { label: "日期", prop: "create_date", sort: 'column' , sort_by: 'HHHHH'}, 
        { label: "姓名", prop: "name", width: 200 },
        { label: "性别", prop: "gender", sort: true },
        {
          type: "slot",
          label: "操作",
          prop: "operation",
          slot_name: "operation",
          render_header: (h, {column, $index})=>{ //自定义表头的意思
            return(
              <div>自定义--操作</div>
            )
          }
        },
      ],
      column_fruit: [
        { label: "姓名", prop: "name" },
        { label: "类别", prop: "type" },
        {
          type: "slot",
          label: "操作",
          prop: "operation",
          slot_name: "operation",
        },
      ],

      //接口传参--data方式&params方式
      data_1: [{ name: "data" }],
      params_1: { name: "params" },

      // 复选框选中的list
      check_list: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.table.handlerRequest();
    }, 3000);
  },
  watch: {
    //监听--复选框的选中的数据
    check_list: {
      handler(value) {
        console.log("watch---check_list", value);
      },
    },
  },
  methods: {
    //编辑
    jumn(row) {
      console.log("编辑---", row);
    },
    onload(data) {
      console.log("父---onload数据回调", data);
    },
    formatData(data) {
      //格式化回调数据
      console.log("格式化回调数据--", data);
      const first_data = [data[0], data[1]];
      return first_data;
    },
    //方法2
    selectChange(data){
      this.check_list = data
      console.log("复选框--勾选中的--表格数据", data)
    },
    getCheckList(){
      console.log('check_list', this.check_list)
    }
  },
};
</script>
