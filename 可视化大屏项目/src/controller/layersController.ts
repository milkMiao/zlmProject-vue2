import { UrlTemplateImageryProvider } from 'cesium'
import { getUUID, getLightMapServer } from '@/utils'

type LayerType = 'tile' | '3dtiles' | 'geojson'

interface BaseLayerConfig {
  type: LayerType
  name: string
  key: string
  url: string
  index: number
  options?: any
}

interface Layer extends BaseLayerConfig {
  layer: any
}

class LayersController {
  layers: Array<Layer>

  constructor() {
    this.layers = []
  }

  add(layerConfig: BaseLayerConfig) {
    const viewer = window.viewer
    if (!viewer) {
      throw new Error('地图初始化失败，无法添加图层！')
    }
    switch (layerConfig.type) {
      case 'tile':
        if (!layerConfig.url) return
        const imageryLayer = viewer.imageryLayers.addImageryProvider(
          new UrlTemplateImageryProvider({
            url: layerConfig?.url,
            options: layerConfig.options
          })
          // layerConfig.index
        )
        const newLayer = {
          ...layerConfig,
          layer: imageryLayer
        }
        this.layers.push(newLayer)
        return newLayer
    }
  }

  getLayerByIndex(index: number) {
    const viewer = window.viewer
    if (!viewer) {
      throw new Error('地图初始化失败，无法添加图层！')
    }
    return viewer.imageryLayers.get(index)
  }

  //暂时只支持切片图层移除
  remove(index: number) {
    const viewer = window.viewer
    const removeLayer = this.getLayerByIndex(index)
    viewer.imageryLayers.remove(this.getLayerByIndex(index))
    this.layers.splice(index, 1)
  }

  //通过name移除图层
  removeByKey(key: string): void {
    const viewer = window.viewer
    const removeLayer = this.layers.find(item => item.key === key)
    removeLayer && viewer.imageryLayers.remove(removeLayer.layer)
  }

  //图层显
  toggleByKey(key: string, status: boolean): void {
    const selectLayer = this.layers.find(item => item.key === key)
    if (selectLayer) {
      selectLayer.layer.show = status
    }
  }

  hasKey(key: string) {
    if (this.layers.some(item => item.key === key)) {
      return true
    }
    return false
  }

  //暂时只支持切片图层显示隐藏
  show(index: number) {
    const showLayer = this.getLayerByIndex(index)
    showLayer.show = true
  }

  hide(index: number) {
    const showLayer = this.getLayerByIndex(index)
    showLayer.show = false
  }

  toggle(index: number) {
    const showLayer = this.getLayerByIndex(index)
    showLayer.show = !showLayer.show
  }

  sort(newOrders: Array<number>) {
    // oldIndex,
    //lower  //lowerToBottom //raise //raiseToTop
  }

  removeAll() {
    const viewer = window.viewer
    this.layers.forEach(item => {
      viewer.imageryLayers.remove(item.layer)
    })
    this.layers = []
  }
}

export default new LayersController()
