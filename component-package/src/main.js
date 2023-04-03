import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

/**UI库*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/**动画*/
// import animate from "animate.css"

/**iconfont库*/
import "./styles/icon/iconfont.css"

/**axios使用*/
Vue.prototype.$axios =axios;

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
