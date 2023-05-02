import { defineStore } from "pinia";
import { useRightAsideStore } from "./viewports";
import tools from "@/config/tools";

export const useToolsStore = defineStore({
  id: "tools",
  state: () => ({
    collapsed: true,
    selectedKeys: ["0"],
  }),
  getters: {
    selectedToolItem(state): MenuItem {
      return (
        tools.find((item) => state.selectedKeys.includes(item.key)) ?? tools[0]
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
      const rightAsideStore = useRightAsideStore();
      rightAsideStore.toggle(!rightAsideStore.collapsed);
    },

    showComponentInContainer(selectedKeys: string[]) {
      selectedKeys = selectedKeys ?? this.selectedKeys;
      const selectedToolItem = this.selectedToolItem;
      const { viewConfig } = selectedToolItem;
      const rightAsideStore = useRightAsideStore();
      if (viewConfig) {
        rightAsideStore.setComponentOfRightAside(viewConfig);
        rightAsideStore.toggle(false);
      }
    },
  },
});
