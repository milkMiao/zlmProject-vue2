<template>
  <div class="button">
    <h1>Button组件封装</h1>
    <!-- 封装按钮 -->
    <Abutton>默认按钮</Abutton>
    <Abutton size="medium" perfix="lingdang">medium按钮</Abutton>
    <Abutton size="small">small按钮</Abutton>
    <Abutton size="mini" suffix="lingdang">mini按钮</Abutton>
    <br />
    <Abutton type="primary" border>primary</Abutton>
    <Abutton type="success" round>success</Abutton>
    <Abutton type="warning" disabled>warning</Abutton>
    <Abutton type="danger">danger</Abutton>

    <br />
    <Abutton minWidth="200px">200弹性宽度</Abutton>

    <br />
    <!-- perfix前缀icon名称，suffix后缀icon名称 -->
    <Abutton perfix="lingdang" size="small">前后缀按钮</Abutton>
    <Abutton suffix="lingdang" size="mini">后缀按钮</Abutton>

    <br />
    <Abutton block type="danger">块级Block</Abutton>

    <Abutton :loading="true" type="primary">加载按钮</Abutton>
    <Abutton type="primary" :loading="flag" @click="handlerChange"
      >loading点击事件</Abutton
    >
    <Abutton type="success" :loading="flag" :before-change="asyncFunction"
      >loading异步事件</Abutton
    >
  </div>
</template>

<script>
import Abutton from "@/components/button";

export default {
  name: "HomeView",
  components: {
    Abutton,
  },
  data() {
    return {
      flag: false,
    };
  },
  methods: {
    asyncFunction(){
      return new Promise ((resolve, reject)=>{
        setTimeout(()=>{//异步
          resolve()
          console.log("asyncFunction---")
        }, 3000)
      })
    },
    handlerChange() {
      this.flag = true

      setTimeout(()=>{//异步
        this.flag = false
        console.log("loading点击事件");
      }, 3000)
    },
  },
};
</script>
