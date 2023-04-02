<template>
  <div class="home">
    <!-- 封装按钮 -->
    <Abutton>默认按钮</Abutton>
    <Abutton size="medium" perfix="lingdang" >medium按钮</Abutton>
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
