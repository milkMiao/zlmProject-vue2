<template>
  <div class="table">
    <!-- 封装按钮 -->
   <ATable :column="column" :index="1" :checkbox="true" />
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
        { 
          type: 'function',
          label: "URL地址", 
          prop: "url",
          width: 100, 
          callback: (data)=>{ 
            console.log('scope.row----', data)
            return `<a href='http://www.web-jshtml.cn'>${data.name}</a>` 
          }
        },
        { label: "日期", prop: "date", width: 200 },
        { label: "姓名", prop: "name" },
        { label: "地址", prop: "address" }
      ],
    };
  },
  methods: {},
};
</script>
