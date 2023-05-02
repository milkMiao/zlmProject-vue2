import * as Cesium from 'cesium'
import { MapController } from './mapController'

export default class Clock {
  private _mapIns: MapController
  constructor(map: MapController) {
    this._mapIns = map
  }
  setCurrentTime() {
    const now = Cesium.JulianDate.fromDate(new Date()) //世界时
    // const current = Cesium.JulianDate.addHours(now, 8, new Cesium.JulianDate())
    const start = Cesium.JulianDate.addHours(now, 8, new Cesium.JulianDate())
    const stop = Cesium.JulianDate.addDays(start, 2, new Cesium.JulianDate())
    this._mapIns.viewer.clock.startTime = start.clone()
    this._mapIns.viewer.clock.currentTime = start.clone()
    this._mapIns.viewer.clock.stopTime = stop.clone()
    this._mapIns.viewer.timeline.zoomTo(start, stop)
  }
}
