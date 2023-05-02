import { defineStore } from "pinia";

export const useRightAsideStore = defineStore({
  id: "right-aside",
  state: (): { collapsed: boolean; viewConfig: ViewConfig } => ({
    collapsed: true,
    viewConfig: {
      component: "",
      props: {
        width: "300px",
      },
    },
  }),
  getters: {},
  actions: {
    toggle(collapsed?: boolean): void {
      this.collapsed = collapsed === undefined ? !this.collapsed : collapsed;
    },

    //只要容器内添加组件，则当前组件必定需要展开
    setComponentOfRightAside(newViewConfig: ViewConfig): void {
      this.viewConfig = newViewConfig;
      this.collapsed = false;
    },
  },
});
