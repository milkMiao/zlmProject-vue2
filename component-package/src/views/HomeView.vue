<template>
  <div class="home">
    <!-- 封装按钮 -->
    <Abutton>默认按钮</Abutton>
    <Abutton type="primary">primary</Abutton>
    <Abutton type="success">success</Abutton>
    <Abutton type="warning">warning</Abutton>
    <Abutton type="danger">danger</Abutton>
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
