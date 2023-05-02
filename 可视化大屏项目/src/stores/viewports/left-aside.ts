import { defineStore } from "pinia";

export const useLeftAsideStore = defineStore({
  id: "left-aside",
  state: (): { collapsed: boolean; viewConfig: ViewConfig } => ({
    collapsed: false,
    viewConfig: {
      component: "",
      props: {
        width: "200px",
      },
    },
  }),
  getters: {},
  actions: {
    toggle(collapsed?: boolean): void {
      this.collapsed = collapsed == undefined ? !this.collapsed : collapsed;
    },

    //只要容器内添加组件，则当前组件必定需要展开
    setComponentOfLeftAside(newViewConfig: ViewConfig): void {
      this.viewConfig = newViewConfig;
      this.collapsed = false;
    },
  },
});
