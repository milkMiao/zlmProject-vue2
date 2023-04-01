<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- 封装按钮 -->
    <Abutton />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Abutton from '@/components/button'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld,
    Abutton
  }
}
</script>
