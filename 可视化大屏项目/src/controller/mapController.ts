import { Viewer, PolygonHierarchy, CallbackProperty, ClassificationType, Color, LabelStyle, ArcType, Cartesian2, JulianDate, SceneTransforms, ArcGisMapServerImageryProvider, ScreenSpaceEventHandler, WebMapTileServiceImageryProvider, Cartesian3, Cesium3DTileset, Cesium3DTileStyle, GeoJsonDataSource, Cesium3DTilesetGraphics, Entity, ScreenSpaceEventType, defined, SplitDirection, HeightReference, EntityCollection } from 'cesium'
import { imageProviderEnum } from '@/config/cesiumEnum'
import { createApp, h, resolveDynamicComponent, defineAsyncComponent, App, Component, useSlots } from 'vue'
import { merge } from 'lodash'
import * as Cesium from 'cesium'
import Measure from './measure'
import Clock from './clock'
import { getQueryVariable } from '@/utils'
interface IEventHandler {
  rollScreenHandler?: ScreenSpaceEventHandler
}

interface IPopupValue {
  contComp?: Component
  cssStyle?: String
}

const defaultPopupValue: IPopupValue = {
  contComp: defineAsyncComponent(() => import('@/components/bi-components/ShowProperty.vue')),
  cssStyle: 'width:300px;'
}

const eventHandler: IEventHandler = {} // 注册的event，保证在其他地方能够拿到

//TODO: 通过装饰器拦截方法调用
const exist = function () {
  if (!window.viewer) {
    throw new Error('cesium初始化失败！')
  }
}

export class MapController {
  measure: Measure = {} as Measure
  clock: Clock
  viewer: Viewer
  constructor() {
    this.measure = new Measure(this)
    this.clock = new Clock(this)
    this.viewer = {} as Viewer
  }
  initMapController(viewer: Viewer) {
    window.viewer = viewer
    this.viewer = viewer
    window.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  }

  getCameraPosition() {
    // 获取当前镜头位置的笛卡尔坐标
    const cameraPosition = window.viewer.camera.position
    // 获取当前坐标系标准
    const ellipsoid = window.viewer.scene.globe.ellipsoid
    // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
    const cartographic = ellipsoid.cartesianToCartographic(cameraPosition)
    // 获取镜头的高度
    const height = cartographic.height
    // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
    const longitude = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8))
    const latitude = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8))
    return { longitude, latitude, height }
  }

  /**
   * @description: 根据缩放倍数进行缩放
   * @param {number} times
   * @return {*}
   */
  zoom(times: number) {
    const cameraPosition = this.getCameraPosition()
    window.viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(cameraPosition.longitude, cameraPosition.latitude, cameraPosition.height * times),
      duration: 1.0
    })
  }

  // 放大
  zoomIn() {
    this.zoom(1 / 1.8)
  }

  // 缩小
  zoomOut() {
    this.zoom(1.8)
  }

  flyToCoordinates(initCoordinates: Coordinates, orientation?: Orientation) {
    window.viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(initCoordinates.longitude, initCoordinates.latitude, initCoordinates.height),
      orientation
    })
  }

  changeSceneMode(mode: string): void {
    if (mode.toLocaleLowerCase() === '3d') {
      window.viewer.scene.morphTo3D(1)
    } else {
      window.viewer.scene.morphTo2D(1)
    }
  }

  add3DTiles(url: string, default3DTileStyle?: Cesium3DTileStyle): void {
    // const datasource = GeoJsonDataSource.load(url)
    // window.viewer.dataSources.add(datasource)
    //初始化3dTiles
    const t3dTiles = new Cesium3DTileset({
      url,
      show: true
    })
    //实现建筑物拉伸
    t3dTiles.readyPromise.then(function (t3dTiles) {
      t3dTiles.style =
        default3DTileStyle ??
        new Cesium3DTileStyle({
          color: {
            conditions: [
              ['${floor} >= 8', 'rgba(45, 0, 75, 0.5)'],
              ['${floor} >= 7', 'rgba(102, 71, 151, 1)'],
              ['${floor} >= 6', 'rgba(170, 162, 204,1)'],
              ['${floor} >= 5', 'rgba(224, 226, 238,1)'],
              ['${floor} >= 4', 'rgba(252, 230, 200,1)'],
              ['${floor} >= 3', 'rgba(248, 176, 87,1)'],
              ['${floor} >= 2', 'rgba(198, 106, 11,1)'],
              ['true', 'rgba(127, 59, 8,1)']
            ]
          }
        })
      window.viewer.scene.primitives.add(t3dTiles)
    })
  }

  changeImageryLayer(url: string | Array<string>, index: number = 0, removeIndex: number, type: string) {
    const viewer = window.viewer
    const imagerLayers = viewer.imageryLayers
    if (removeIndex === undefined) {
      imagerLayers.removeAll()
    } else {
      imagerLayers.remove(imagerLayers.get(removeIndex))
    }
    let layer = {}
    if (typeof url === 'string') {
      let layer = this.getImageryProviderByType(type, url)
      imagerLayers.addImageryProvider(layer, index)
    } else {
      url.forEach(element => {
        const layer = this.getImageryProviderByType(type, element)
        imagerLayers.addImageryProvider(layer, index)
      })
    }
  }

  getImageryProviderByType(type: string, url: string) {
    let layer: any = ''
    if (type === imageProviderEnum.wmsImageProvider) {
      const token = '90d5d9a09547e50b464bd28a4f2a59fc'
      const lay = getQueryVariable('layer', url)
      const tileMatrixSetID = getQueryVariable('tilematrixset', url)
      layer = new WebMapTileServiceImageryProvider({
        url: url + `&tk=${token}`,
        layer: lay,
        format: 'tiles',
        style: 'default',
        tileMatrixSetID: tileMatrixSetID
      })
    } else if (type === imageProviderEnum.arcgisImageProvider) {
      layer = new ArcGisMapServerImageryProvider({
        url: url
      })
    }
    return layer
  }

  addListenerPopup(popupEle: HTMLElement, gisPos: Cartesian3) {
    const windowPos = SceneTransforms.wgs84ToWindowCoordinates(window.viewer.scene, gisPos)
    popupEle.style.left = windowPos.x - 150 + 'px'
    popupEle.style.top = windowPos.y - 240 + 'px'
    const camerPos = window.viewer.camera.position
    let height = window.viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPos).height
    height += window.viewer.scene.globe.ellipsoid.maximumRadius
    if (!(Cartesian3.distance(camerPos, gisPos) > height) && window.viewer.camera.positionCartographic.height < 50000000) {
      popupEle.style.display = 'block'
    } else {
      popupEle.style.display = 'none'
    }
  }
  clickShowModal(popupValue?: IPopupValue) {
    this.addEntity({
      name: 'Blue box',
      position: Cartesian3.fromDegrees(120.62446298284968, 31.2661808016077),
      box: {
        dimensions: new Cartesian3(4000.0, 3000.0, 500.0),
        material: Color.BLUE
      },
      properties: {
        propertyName: 'propertyName',
        value: {
          coordinates: [120.62446298284968, 31.2661808016077]
        }
      }
    })
    const value = { ...defaultPopupValue, ...popupValue }
    const { contComp, cssStyle } = value
    const handler = new ScreenSpaceEventHandler(window.viewer.canvas)
    let app: App = {} as App
    let popup = {} as HTMLElement
    const comp = defineAsyncComponent(() => import('@/components/common/BaseModal.vue'))
    const slot = useSlots()
    handler.setInputAction(movement => {
      const picker = window.viewer.scene.pick(movement.position)
      if (defined(picker) && picker.id.id) {
        const property = picker.id.properties?.getValue(JulianDate.now(new Date()))
        if (app.unmount) {
          app.unmount()
        }
        const prop = {
          title: '属性',
          visible: true,
          type: 'custom',
          width: '100%',
          'onUpdate:visible': (val: any) => {
            prop.visible = false
            removeHandler.call()
            popup.style.display = 'none'
          }
        }
        app = createApp({
          render() {
            return h(comp, prop, {
              default: props =>
                h(contComp, {
                  property: property
                })
            })
          }
        })
        if (JSON.stringify(popup) === '{}') {
          popup = document.createElement('div')
          popup.id = 'popup'
          popup.style.position = 'absolute'
          popup.style.display = 'block'
          popup.style.cssText = popup.style.cssText + cssStyle
          // setPopupPosition(picker, popup)
          document.getElementById('cesium-container')?.appendChild(popup)
        }
        app.mount('#popup')
        // const gisPos = Cartesian3.fromDegrees(property.value.coordinates[0], property.value.coordinates[1])
        // const gisPos = window.viewer.scene.pickPosition(new Cartesian2(movement.position.x, movement.position.y))
        const gisPos = window.viewer.scene.pickPosition(movement.position.clone())
        const removeHandler = window.viewer.scene.postRender.addEventListener(() => {
          this.addListenerPopup(popup, gisPos)
        })
      }
    }, ScreenSpaceEventType.LEFT_DOWN)
  }

  rollScreen(splitLayerUrl: string, dom: HTMLElement) {
    const layers = window.viewer.imageryLayers
    const layerProvider = this.getImageryProviderByType('ArcGisMapServerImageryProvider', splitLayerUrl)
    const splitLayer = layers.addImageryProvider(layerProvider)
    splitLayer.splitDirection = SplitDirection.LEFT
    if (!dom.parentElement) {
      return
    }
    window.viewer.scene.splitPosition = dom.offsetLeft / dom.parentElement.offsetWidth
    eventHandler.rollScreenHandler = new ScreenSpaceEventHandler(dom as HTMLCanvasElement)
    eventHandler.rollScreenHandler.setInputAction(start, ScreenSpaceEventType.LEFT_DOWN)
    eventHandler.rollScreenHandler.setInputAction(start, ScreenSpaceEventType.PINCH_START)
    eventHandler.rollScreenHandler.setInputAction(move, ScreenSpaceEventType.MOUSE_MOVE)
    eventHandler.rollScreenHandler.setInputAction(move, ScreenSpaceEventType.PINCH_MOVE)
    eventHandler.rollScreenHandler.setInputAction(end, ScreenSpaceEventType.LEFT_UP)
    eventHandler.rollScreenHandler.setInputAction(end, ScreenSpaceEventType.PINCH_END)
    let moveActive = false
    function start() {
      moveActive = true
    }
    function end() {
      moveActive = false
    }
    function move(movement: any) {
      if (!moveActive) return
      const relativeOffset = movement.endPosition.x
      if (!dom.parentElement) {
        return
      }
      const splitPosition = (dom.offsetLeft + relativeOffset) / dom.parentElement.offsetWidth
      dom.style.left = `${100.0 * splitPosition}%`
      window.viewer.scene.splitPosition = splitPosition
    }
    return function removeRollScreen() {
      layers.remove(splitLayer)
      window.viewer.scene.splitPosition = 0
      eventHandler.rollScreenHandler?.destroy()
    }
  }

  addLabel(pos: any, entityParams?: Entity.ConstructorOptions) {
    const defaultVal = {
      position: pos,
      label: {
        font: '14px sans-serif',
        style: LabelStyle.FILL_AND_OUTLINE, //FILL  FILL_AND_OUTLINE OUTLINE
        fillColor: Color.YELLOW,
        showBackground: true, //指定标签后面背景的可见性
        backgroundColor: new Color(0.165, 0.165, 0.165, 0.8), // 背景颜色
        backgroundPadding: new Cartesian2(6, 6), //指定以像素为单位的水平和垂直背景填充padding
        pixelOffset: new Cartesian2(0, -25),
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    }
    const params = merge(defaultVal, entityParams)
    return this.addEntity(params)
  }
  addPoint(pos: Cartesian3, entityParams?: Entity.ConstructorOptions) {
    const defaultVal = {
      position: pos,
      point: {
        show: true,
        color: Color.LIME,
        pixelSize: 10,
        outlineWidth: 1,
        outlineColor: Color.SKYBLUE,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        heightReference: HeightReference.NONE
      }
    }
    const params = merge(defaultVal, entityParams)
    return this.addEntity(params)
  }
  addLine(pos: Array<Cartesian3>, entityParams?: Entity.ConstructorOptions) {
    var dynamicPos = new CallbackProperty(() => {
      return pos
    }, false)
    const defaultVal = {
      polyline: {
        positions: dynamicPos,
        width: 3,
        arcType: ArcType.RHUMB,
        clampToGround: true,
        material: Color.BLUE, //获取或设置折线的表面外观
        heightReference: HeightReference.CLAMP_TO_GROUND
      }
    }
    const params = merge(defaultVal, entityParams)
    return this.addEntity(params)
  }
  addPolygon(pos: Array<Cartesian3>, entityParams?: Entity.ConstructorOptions) {
    var dynamicPos = new CallbackProperty(() => {
      return new PolygonHierarchy(pos)
    }, false)
    const defaultVal = {
      polygon: {
        heightReference: HeightReference.CLAMP_TO_GROUND,
        hierarchy: dynamicPos,
        material: Color.BLUE.withAlpha(0.6),
        classificationType: ClassificationType.BOTH // 贴地表和贴模型,如果设置了，这不能使用挤出高度
      }
    }
    const params = merge(defaultVal, entityParams)
    return this.addEntity(params)
  }
  addEntity(entityParams: Entity.ConstructorOptions) {
    return window.viewer.entities.add(new Entity(entityParams))
  }
}
export default new MapController()
