<template>
  <div>
    <h1>Table组件封装</h1>
    <el-table :data="tableData" border style="width: 100%">
      <!-- 索引 -->
      <el-table-column
        v-if="index"
        type="index"
        width="55"
        :index="index"
      ></el-table-column>

      <!-- 复选框 -->
      <el-table-column
        v-if="checkbox"
        type="selection"
        width="55"
        :checkbox="checkbox"
      ></el-table-column>

      <!-- 表格内容 -->
      <template v-for="item in column">
        <!-- 1、function类型 -->
        <el-table-column
          v-if="item.type === 'function'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <div v-html="item.callback && item.callback(scope.row)"></div>
          </template>
        </el-table-column>

        <!-- 2、slot插槽类型 -->
        <el-table-column
          v-else-if="item.type === 'slot'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot :name="item.slot_name" :data="scope.row"></slot>
          </template>
        </el-table-column>

        <!-- 其他 -->
        <el-table-column
          v-else
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    index: {
      //索引
      type: Number,
      default: 0,
    },
    checkbox: {
      //复选框
      type: Boolean,
      default: true,
    },
    column: {
      type: Array,
      default: () => [],
    },

    /**axios请求处理*/
    url:{
      type: String,
      default: "",
      require: true
    },
    method: {
      type: String,
      default: "post",
      require: true
    }
  },
  data() {
    return {
      tableData: [
        {
          create_date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          create_date: "2016-05-04",
          name: "赵喵喵",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          create_date: "2016-05-01",
          name: "张五五",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          create_date: "2016-05-03",
          name: "李琪琪",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  beforeMount() {
    this.getTableList();
  },
  methods: {
    getTableList(){
      const url = this.url;
      if(!url) console.log("请求地址不存在！")

      this.$axios({
        url: this.url,
        methods: this.method,
      }).then((response) => {
        this.tableData = response.data.data;
        console.log("beforeMount-----", response.data);
      });
    }
  },
};
</script>

<style>
</style>