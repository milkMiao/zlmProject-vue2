/*
 * @Author: zhixian
 * @Date: 2022-05-23 09:51:42
 * @Description:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
// import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "animate.css";
import "@/assets/scrollbar.css";
import "./assets/base.scss";
import directive from "@/directive";
import DataVVue3 from "@kjgl77/datav-vue3";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(directive);
app.use(DataVVue3);
app.mount("#app");
