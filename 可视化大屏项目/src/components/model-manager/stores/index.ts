//淹没分析store
import { defineStore } from 'pinia'

export const useModelStore = defineStore({
  id: 'model',
  state: () => ({
    checkedItem: null,
    lossCalcData: {},
    modelToken: '',
    selectModelLibrary: []
  }),
  getters: {},
  actions: {
    updateSelectModelLibrary(data: any) {
      this.selectModelLibrary = data
    },
    updateModelToken(data: string) {
      this.modelToken = data
    },
    updataLossCalcData(data: any) {
      this.lossCalcData = data
    },

    updateCheckedItem(checkedItem: any) {
      this.checkedItem = checkedItem
    }
  }
})
