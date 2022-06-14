import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import ModifyPanel from "../pages/ModifyPanel.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/modify",
      name: "Modify",
      props: true,//注意点--路由携带才参数的时候
      component: ModifyPanel,
    },
  ],
});
