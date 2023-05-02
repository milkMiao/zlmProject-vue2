/*
 * @Author: zhixian
 * @Date: 2022-01-13 23:22:30
 * @Description: 调度所有Store
 */
import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    activeLayer: null,
  }),
  getters: {},
  actions: {
    updateActiveLayer(newActiveLayer: any) {
      this.activeLayer = newActiveLayer;
    },
  },
});
