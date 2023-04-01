<template>
  <div class="home">
    <!-- 封装按钮 -->
    <Abutton>默认按钮</Abutton>
    <Abutton size="mini">mini按钮</Abutton>
    <Abutton type="primary" border>primary</Abutton>
    <Abutton type="success" round>success</Abutton>
    <Abutton type="warning" disabled>warning</Abutton>
    <Abutton type="danger">danger</Abutton>

    <br />
    <Abutton minWidth="200px">弹性宽度</Abutton>
  </div>
</template>

<script>
import Abutton from '@/components/button'

export default {
  name: 'HomeView',
  components: {
    Abutton
  }
}
</script>
