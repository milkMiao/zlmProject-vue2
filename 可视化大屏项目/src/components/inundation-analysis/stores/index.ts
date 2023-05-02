//淹没分析store
import { defineStore } from 'pinia'

export const useInundationStore = defineStore({
  id: 'inundation',
  state: () => ({
    jobId: '', //存储LOC文件处理进度
    checkedLoc: null
  }),
  getters: {},
  actions: {
    updateCheckedLoc(newLoc: any) {
      this.checkedLoc = newLoc
    }
  }
})
