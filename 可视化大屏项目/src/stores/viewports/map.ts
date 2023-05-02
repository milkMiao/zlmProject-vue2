import { defineStore } from "pinia";

export const useMapStore = defineStore({
  id: "map",
  state: (): MapState => ({
    sceneMode: "3D",
    initCoordinates: {
      longitude: 120.66324226857473,
      latitude: 30.972771236195076,
      height: 1000,
    },
    orientation: {
      heading: 6.243981546223235,
      // 视角
      pitch: -0.30491203651397947,
      roll: 0.0000035188842675282217,
    },
    baseLayerUrl:
      "https://t0.tianditu.gov.cn/cia_w/esri/wmts?layer=cia&tilematrixset=w",
  }),
  getters: {},
  actions: {},
});
