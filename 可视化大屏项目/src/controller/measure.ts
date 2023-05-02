import * as Cesium from 'cesium'
import { Cartesian3, CallbackProperty, ScreenSpaceEventType } from 'cesium'
import { MapController } from './mapController'
export default class Measure {
  private _mapIns: MapController
  private _measureEntities: Array<Cesium.Entity>
  constructor(map: any) {
    this._mapIns = map
    this._measureEntities = []
  }
  measurePolyLine(cb?: Function) {
    const viewer = window.viewer
    const positions: Array<Cartesian3> = []
    let labelEntity: any = null
    let lineEntity: any = null
    const handler = viewer.screenSpaceEventHandler
    const self = this
    let totalLen = 0
    let preCalPoint: Array<any> = []
    function getLabelTxt() {
      const first = positions[positions.length - 2]
      const second = positions[positions.length - 1]
      if (preCalPoint.length) {
        //CallbackProperty会实时执行该方法，如果两个点不变则返回上次计算结果
        if (preCalPoint[0] === first && preCalPoint[1] === second) {
          return self.getDistanceUnit(totalLen)
        }
      }
      const len = self.getLength(first, second)
      preCalPoint = [first, second]
      totalLen += len
      return self.getDistanceUnit(totalLen)
    }
    function getRealPos() {
      return positions[positions.length - 1]
    }
    handler.setInputAction(e => {
      // 点击
      let clickStatus = true // 一个新的起点或结束点
      const pickPos = viewer.scene.pickPosition(e.position)
      if (!pickPos) return
      // 大于1了在移动过程中已经添加了
      if (positions.length <= 1) {
        positions.push(pickPos.clone())
      } else {
        positions.pop()
        positions.push(pickPos.clone())
      }
      this._measureEntities.push(this._mapIns.addPoint(pickPos.clone()))
      if (!lineEntity) {
        lineEntity = this._mapIns.addLine(positions)
        this._measureEntities.push(lineEntity)
      }
      if (positions.length >= 2) {
        const lengthText = getLabelTxt()
        const label = this._mapIns.addLabel(pickPos, { label: { text: lengthText } })
        this._measureEntities.push(label)
      }
      handler.setInputAction(movement => {
        // 移动
        const movePosTemp = viewer.scene.pickPosition(movement.endPosition)
        if (!movePosTemp) return
        const movePos = movePosTemp.clone()
        // 移动过程中保证只有两个点
        if (positions.length <= 1) {
          positions.push(movePos)
        } else {
          if (!clickStatus) {
            // false新的起点不需要pop
            positions.pop()
          }
          positions.push(movePos)
        }
        if (!labelEntity) {
          const reaTxt = new CallbackProperty(() => {
            return getLabelTxt()
          }, false)
          const realPos = new CallbackProperty(time => getRealPos(), false)
          labelEntity = this._mapIns.addLabel(realPos, { label: { text: reaTxt } })
          this._measureEntities.push(labelEntity)
        }
        clickStatus = false
        handler.setInputAction(end => {
          // 右击
          const endPos = viewer.scene.pickPosition(end.position)
          if (!endPos) return
          const point = this._mapIns.addPoint(endPos.clone())
          this._measureEntities.push(point)
          this.clearMeasureEvent()
          this.measurePolyLine()
          if (cb) {
            cb()
          }
        }, ScreenSpaceEventType.RIGHT_CLICK)
      }, ScreenSpaceEventType.MOUSE_MOVE)
    }, ScreenSpaceEventType.LEFT_CLICK)
  }
  measurePolygon(cb?: Function) {
    const positions: Array<Cartesian3> = []
    let labelEntity: any = null
    const viewer = window.viewer
    const handler = viewer.screenSpaceEventHandler
    let isEnd = false
    function getRealPos() {
      let index = positions.length - 1
      if (isEnd) {
        index = positions.length - 2
      }
      return positions[index]
    }
    handler.setInputAction(e => {
      const pickPosTemp = viewer.scene.pickPosition(e.position)
      if (!pickPosTemp) return
      let clickStatus = true
      const pickPos = pickPosTemp.clone()
      positions.push(pickPos)
      this._measureEntities.push(this._mapIns.addPoint(pickPos))
      if (positions.length >= 3) {
        this._measureEntities.push(this._mapIns.addPolygon(positions))
        if (!labelEntity) {
          const areaTxt = new CallbackProperty(time => this.getArea(positions), false)
          const realPos = new CallbackProperty(time => getRealPos(), false)
          labelEntity = this._mapIns.addLabel(realPos, { label: { text: areaTxt } })
          this._measureEntities.push(labelEntity)
        }
      }
      handler.setInputAction(movement => {
        const moveP = viewer.scene.pickPosition(movement.endPosition)
        if (!moveP) return
        const movePos = moveP.clone()
        if (positions.length <= 1) {
          positions.push(movePos)
          this._measureEntities.push(this._mapIns.addLine(positions))
        } else {
          if (!clickStatus) {
            positions.pop()
          }
          positions.push(movePos)
        }
        clickStatus = false
        handler.setInputAction(end => {
          const endPos = viewer.scene.pickPosition(end.position)
          if (!endPos) return
          this._measureEntities.push(this._mapIns.addPoint(endPos.clone()))
          positions.push(positions[0])
          isEnd = true
          this.clearMeasureEvent()
          this.measurePolygon()
          if (cb) {
            cb()
          }
        }, ScreenSpaceEventType.RIGHT_CLICK)
      }, ScreenSpaceEventType.MOUSE_MOVE)
    }, ScreenSpaceEventType.LEFT_CLICK)
  }
  getCoordinate(cb?: Function) {
    const viewer = window.viewer
    const handler = viewer.screenSpaceEventHandler
    handler.setInputAction(e => {
      const pickPos = viewer.scene.pickPosition(e.position)
      if (!pickPos) return
      const ellipsoid = viewer.scene.globe.ellipsoid
      const cartographic = ellipsoid.cartesianToCartographic(pickPos)
      const lat = Cesium.Math.toDegrees(cartographic.latitude)
      const long = Cesium.Math.toDegrees(cartographic.longitude)
      this._measureEntities.push(this._mapIns.addPoint(pickPos))
      this._measureEntities.push(this._mapIns.addLabel(pickPos, { label: { text: `经度:${long.toFixed(4)},纬度:${lat.toFixed(4)}` } }))
    }, ScreenSpaceEventType.LEFT_CLICK)
  }
  clearAll() {
    this._measureEntities.forEach(element => {
      window.viewer.entities.remove(element)
    })
    this._measureEntities = []
    this.clearMeasureEvent()
  }
  clearMeasureEvent() {
    const viewer = window.viewer
    viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }
  getArea(points: Array<Cartesian3>) {
    var ps = []
    for (var i = 0; i < points.length; i++) {
      var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(points[i])
      var height = window.viewer.scene.globe.getHeight(cartographic)
      var point = Cesium.Cartesian3.fromDegrees((cartographic.longitude / Math.PI) * 180, (cartographic.latitude / Math.PI) * 180, height)
      ps.push(point)
    }
    var s = 0
    for (var i = 0; i < ps.length; i++) {
      var p1 = ps[i]
      var p2
      if (i < ps.length - 1) p2 = ps[i + 1]
      else p2 = ps[0]
      s += p1.x * p2.y - p2.x * p1.y
    }
    var res

    if (s < 1000000) {
      res = Math.abs(s).toFixed(4) + ' 平方米'
    } else {
      res = Math.abs(Number((s / 1000000.0).toFixed(4))) + ' 平方公里'
    }

    return res
  }

  getLength(firstPoint: Cartesian3, secondPoint: Cartesian3) {
    // 计算距离
    const length = Cartesian3.distance(firstPoint, secondPoint)
    return length
  }
  getDistanceUnit(distance: number) {
    let str = ''
    if (distance > 1000) {
      str = (distance / 1000).toFixed(2) + ' 公里'
    } else {
      str = distance.toFixed(2) + ' 米'
    }
    return str
  }
}
