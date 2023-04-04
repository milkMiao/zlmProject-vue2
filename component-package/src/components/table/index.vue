<template>
  <div>
    <h1>Table组件封装</h1>
    <el-table
      @selection-change="handlerSelectChange"
      @sort-change="sortChange"
      :data="tableData"
      border
      style="width: 100%"
    >
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
        <!-- 1、function类型, 排序只针对当前页-其他页面还不行 -->
        <el-table-column
          v-if="item.type === 'function'"
          :sortable="item.sort"
          :sort-by="item.sort_by"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <div v-html="item.callback && item.callback(scope.row)"></div>
          </template>
        </el-table-column>

        <!-- 2、slot插槽类型，排序只针对当前页-其他页面还不行 -->
        <el-table-column
          v-else-if="item.type === 'slot'"
          :sortable="item.sort"
          :sort-by="item.sort_by"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot :name="item.slot_name" :data="scope.row"></slot>
          </template>
        </el-table-column>

        <!-- 其他，排序只针对当前页-其他页面还不行 -->
        <el-table-column
          v-else
          :sortable="item.sort"
          :sort-by="item.sort_by"
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
    url: {
      type: String,
      default: "",
      require: true,
    },
    method: {
      type: String,
      default: "post",
      require: true,
    },

    /**请求数据和接口参数*/
    data: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      default: () => ({}),
    },

    /**初始化请求*/
    initRequest: {
      type: Boolean,
      default: true,
    },
    /**onload回调函数*/
    onLoad: {
      type: Boolean,
      default: false,
    },
    /**格式化回调数据*/
    format: Function,

    /**复选框-选中的数据list*/
    checkList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableData: [
        // {
        //   create_date: "2016-05-02",
        //   name: "默认数据",
        //   address: "上海市普陀区金沙江路 1518 弄",
        // },
        // {
        //   create_date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        // },
        // {
        //   create_date: "2016-05-04",
        //   name: "赵喵喵",
        //   address: "上海市普陀区金沙江路 1517 弄",
        // },
        // {
        //   create_date: "2016-05-01",
        //   name: "张五五",
        //   address: "上海市普陀区金沙江路 1519 弄",
        // },
        // {
        //   create_date: "2016-05-03",
        //   name: "李琪琪",
        //   address: "上海市普陀区金沙江路 1516 弄",
        // },
      ],
    };
  },
  beforeMount() {
    //根据initRequest，实现初始化是否--请求一次接口
    console.log("初始化请求---", this.initRequest);
    this.initRequest && this.getTableList();
  },
  methods: {
    getTableList() {
      const url = this.url;
      if (!url) console.log("请求地址不存在！");

      const request_data = {
        url: this.url,
        methods: this.method,
        data: this.data,
        params: this.params,
      };
      console.log("data--", JSON.stringify(this.data)); //字符串 [{"name":"hello"}]
      console.log("params--", JSON.stringify(this.params)); // 字符串 {"name":"haha"}

      //参数处理
      if (JSON.stringify(this.data) !== "[]") {
        request_data.data = this.data;
      }
      if (JSON.stringify(this.params) !== "{}") {
        request_data.data = this.params;
      }
      console.log(
        "---data & params-----& request_data:",
        this.data,
        this.params,
        request_data
      );

      //接口请求
      this.$axios(request_data).then((response) => {
        //未格式化的数据
        // this.tableData = response.data.data;

        //格式化后的回调数据
        let request_data = response.data.data;
        if (this.format && typeof this.format === "function") {
          request_data = this.format(response.data.data);
        }
        console.log("getTableList-----", request_data);
        this.tableData = request_data;

        //方法一：回调数据
        // if(this.onLoad) {
        //   this.$emit('onload', response.data.data)
        // }
        //方法二：回调数据
        this.onLoad && this.$emit("onload", response.data.data);
        // console.log("getTableList-----", response.data);
      });
    },
    //手动请求数据
    handlerRequest() {
      console.log("手动请求数据");
      this.getTableList();
    },
    //勾选--复选框
    handlerSelectChange(val) {
      //val勾选中的表格数据
      console.log("handlerSelectChange", val);
      //方法1:
      this.$emit("update:check_list", val);

      //方法2:
      // this.$emit('selectChange', val)
    },
    /**
     * 远程排序，sort='column', @sort-change事件【当表格的排序条件发生变化的时候会触发该事件】
     * 1、column: 对象里会有--sortBy: "HHHHH"
     * 2、prop：当前排序字段
     * 3、order： descending降序  , ascending升序
     * */
    sortChange({ column, prop, order }) {
      console.log("column--", column, prop, order);
    },
  },
};
</script>

<style>
</style>