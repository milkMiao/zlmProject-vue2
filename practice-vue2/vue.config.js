// vue-cli
// webpack
// cjs
// /api
module.exports = { //代理处理，解决请求接口的跨域问题
  devServer: {
    proxy: {
      "/api": {  //拦截
        target: "http://localhost:8081", //映射
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
