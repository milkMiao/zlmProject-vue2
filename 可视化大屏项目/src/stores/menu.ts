import { defineStore } from "pinia";
import { useLeftAsideStore } from "./viewports";
import menu from "@/config/menu";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    collapsed: true,
    selectedKeys: ["0"],
  }),
  getters: {
    selectedMenuItem(state): MenuItem {
      return (
        menu.find((item) => state.selectedKeys.includes(item.key)) ?? menu[0]
      );
    },
  },
  actions: {
    toggleCollapsed(collapsed: boolean) {
      this.collapsed = collapsed;
    },

    changeSelectedKeys({ selectedKeys }: { selectedKeys: Array<string> }) {
      this.selectedKeys = selectedKeys;
      this.showComponentInContainer(selectedKeys);
    },

    changeAsideStatus() {
      const leftAsideStore = useLeftAsideStore();
      leftAsideStore.toggle(!leftAsideStore.collapsed);
    },

    showComponentInContainer(selectedKeys: string[]) {
      selectedKeys = selectedKeys ?? this.selectedKeys;
      const selectedMenuItem = this.selectedMenuItem;
      const { viewConfig } = selectedMenuItem;
      const leftAsideStore = useLeftAsideStore();
      if (viewConfig) {
        leftAsideStore.setComponentOfLeftAside(viewConfig);
        leftAsideStore.toggle(false);
      }
    },
  },
});
