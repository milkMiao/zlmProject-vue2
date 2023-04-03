<template>
    <div>
        <h1>Table组件封装</h1>
        <el-table :data="tableData" style="width: 100%;border: 1px solid #ccc;">
            <!-- 索引 -->
            <el-table-column v-if="index" type="index" width="55" :index="index"></el-table-column>
            <!-- 复选框 -->
            <el-table-column  v-if="checkbox" type="selection" width="55" :checkbox="checkbox"></el-table-column>
            <el-table-column 
                v-for="item in column" 
                :key="item.prop" 
                :prop="item.prop" 
                :label="item.label" 
                :width="item.width"
            ></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    index: { //索引
      type: Number,
      default: 0
    },
    checkbox: { //复选框
      type: Boolean,
      default: true
    },
    column: {
        type: Array,
        default: ()=> []
    },
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>

<style>
</style>