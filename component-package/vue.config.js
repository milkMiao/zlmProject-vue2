const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })

module.exports = {
  //关闭eslint配置
  lintOnSave: false,
  //使用button的主题色配置文件
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/styles/scssconfig.scss";'
      }
    },
  },
  //跨域处理
  devServer: {
    open: true,
    // 默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    host: "0.0.0.0",
    port: 8080,//访问端口
    // hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
    hot: true,
    https: false,
    // hotOnly: false,
    proxy: {
      [process.env.VUE_APP_API]: {
        target: process.env.VUE_API_DEV_TARGET, //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_API}`]: ''
        }
      }
    }
  },
  /**第三方插件*/
  pluginOptions: {}
}
