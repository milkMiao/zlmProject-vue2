<template>
</template>

<script setup lang='ts'>
import CesiumPrint from "cesium-print";
import { ref } from 'vue'
exportImage()
function exportImage() {
  CesiumPrint.drawArea("cesiumCanvas", {
    penColor: "yellow", //画笔颜色
    strokeWidth: 1 //单位 px
  })
    .then(base64url => {
      //base64url is images
      CesiumPrint.print(base64url, {
        title: "图片",
        // width: a4.width,
        // height: a4.height,
        // fontSize: "30",
        downLoadEnable: true //是否下载打印文件
      });
      //print drawArea dom
    })
    .catch(error => {
      console.error(error);
    })
}
</script>

<style scoped lang='scss'>
</style>