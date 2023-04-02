import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/**UI库*/
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

/**动画*/
// import animate from "animate.css"

/**iconfont库*/
import "./styles/icon/iconfont.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
