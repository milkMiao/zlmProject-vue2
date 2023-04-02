const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })

module.exports = {
  lintOnSave: false,
  //使用button的主题色配置文件
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/styles/scssconfig.scss";'
      }
    },
  }
}
