<template>
  <el-button class="a-button">默认按钮</el-button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .a-button{
        padding: 0 20px;
        border-width: 1px;
        border-style: solid;
        border-color: #dcdfe6;
        border-radius: 4px;
        background-color: #fff;
        font-size: 14px;
        color: #606266;
        height: 40px;
    }
    .a-button-primary{
        background-color: #409eff;
        border-color: #409eff;
        color: #FFF;
    }
    .a-button-success{
        background-color: #00d100;
        border-color: #00d100;
        color: #FFF;
    }
    .a-button-warning{
        background-color: #e6a23c;
        border-color: #e6a23c;
        color: #FFF;
    }
    .a-button-danger{
        background-color: #f56c6c;
        border-color: #f56c6c;
        color: #FFF;
    }
</style>