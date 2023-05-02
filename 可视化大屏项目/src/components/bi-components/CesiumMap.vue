<script setup lang="ts">
import {
  Viewer,
  Cartesian3,
  ArcGisMapServerImageryProvider,
  TileMapServiceImageryProvider,
  UrlTemplateImageryProvider,
  GeoJsonDataSource,
  Color,
  Cesium3DTileset,
  HeadingPitchRange,
  Matrix4,
  Cartographic,
  Cesium3DTileStyle,
} from "cesium";
import * as Cesium from "cesium";
import {
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";
import { onMounted, watch } from "vue";
import { useMapStore } from "@/stores/viewports";
import { mapController } from "@/controller";
const mapStore = useMapStore();
const { initCoordinates, baseLayerUrl, orientation } = mapStore;

Cesium.Timeline.prototype.makeLabel = function (e) {
  const date = new Date();
  const h = 0 - date.getTimezoneOffset();
  //由于Cesium都是以JulianDate作为默认日期，所以参数e肯定为JulianDate类型，所以我们可以像上面clock改造一样改造
  const dateZone = Cesium.JulianDate.addMinutes(e, h, new Cesium.JulianDate());
  const t = Cesium.JulianDate.toGregorianDate(dateZone);
  const i = t.millisecond;
  let r = " UTC";
  if (0 < i && this._timeBarSecondsSpan < 3600) {
    for (r = Math.floor(i).toString(); r.length < 3;) r = "0" + r;
    r = "." + r;
  }
  //这里就是设置格式的地方
  return `${t.year}/${t.month}/${t.day} ${t.hour}时`;
};

//cesium地图初始化
onMounted(() => {
  // const token = "90d5d9a09547e50b464bd28a4f2a59fc";
  // const lay = getQueryVariable('layer', url);
  // const tileMatrixSetID = getQueryVariable('tilematrixset', 'https://t0.tianditu.gov.cn/cia_w/esri/wmts?layer=cia&tilematrixset=w')
  // layer = new WebMapTileServiceImageryProvider({
  //   url: url + `&tk=${token}`,
  //   layer: lay,
  //   format: 'tiles',
  //   style: 'default',
  //   tileMatrixSetID: tileMatrixSetID
  // })
  var imageryViewModels = [];
  var gisuni = new Cesium.ProviderViewModel({
    name: "深蓝底图",
    tooltip: "",
    iconUrl: "./assets/images/arcgis4.png",
    creationFunction: function () {
      const mapsources = [];
      const yx = new Cesium.ArcGisMapServerImageryProvider({
        url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
      });
      mapsources.push(yx);
      return mapsources;
    },
  });

  imageryViewModels.push(gisuni);

  var tiandituyx = new Cesium.ProviderViewModel({
    name: "天地图影像",
    tooltip: "天地图影像及中文标注数据",
    iconUrl: "./assets/images/thumbnail1629180632982.png",
    creationFunction: function () {
      var mapsources = [];
      var yx = new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=90d5d9a09547e50b464bd28a4f2a59fc",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: false,
      });
      var jd = new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=90d5d9a09547e50b464bd28a4f2a59fc",
        layer: "tiandituImgMarker",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "tiandituImgMarker",
        show: true,
        maximumLevel: 16,
      });
      mapsources.push(yx, jd);
      return mapsources;
    },
  });
  imageryViewModels.push(tiandituyx);

  const viewer = new Viewer("cesium-container", {
    // terrainProvider: Cesium.createWorldTerrain(),
    // imageryProvider: new ArcGisMapServerImageryProvider({
    //   url: baseLayerUrl,
    // }),
    // imageryProvider: layer,
    imageryProviderViewModels: imageryViewModels,
    selectedImageryProviderViewModel: gisuni,
    sceneMode: Cesium.SceneMode.SCENE3D,
    // mapStore.sceneMode === "2D"
    //   ? Cesium.SceneMode.SCENE2D
    //   : Cesium.SceneMode.SCENE3D,
    geocoder: false, //地理编码服务
    homeButton: false, //返回初始位置
    sceneModePicker: false, //二三维切换
    baseLayerPicker: true, //底图切换
    navigationHelpButton: false, //导航帮助按钮
    animation: true, //播放相关
    timeline: true, //时间轴
    fullscreenButton: false, //全屏按钮
    vrButton: false, //vr按钮
    shadows: true,
    contextOptions: {
      id: "cesiumCanvas", //must
      webgl: {
        preserveDrawingBuffer: true,
      },
    },
  });
  //地表以下建筑不显示
  viewer.scene.globe.depthTestAgainstTerrain = true;
  //去掉二三维切换动画效果,可以实现二三维原地切换

  //设置起始点坐标方便进行飞入
  // viewer.camera.setView({
  //   destination: Cesium.Cartesian3.fromDegrees(121, 31, 10000000),
  // });

  mapController.initMapController(viewer);
  viewer.scene.canvas.id = "cesiumCanvas";
  mapController.flyToCoordinates(initCoordinates, orientation);
  mapController.clock.setCurrentTime()
  // mapController.clickShowModal();
  // mapController()
  // mapController.measure.measurePolyLine()
  // layers.forEach((item) => {
  //   viewer.imageryLayers.addImageryProvider(
  //     new UrlTemplateImageryProvider({
  //       url: item.url,
  //     })
  //   );
  // });

  // mapController.add3DTiles(
  //   import.meta.env.VITE_BUILDTILE + "suzhou_building_wgs84/tileset.json"
  // );

  let date = new Date();
  //可返回格林威治时间和本地时间之间的时差
  let h = 0 - date.getTimezoneOffset();
  // 设置时间
  // viewer.animation.viewModel.timeFormatter = function(date, viewModel) {
  //     //重新构造一个当前系统时间的儒略日
  //     let dateZone = Cesium.JulianDate.addMinutes(date,h,new Cesium.JulianDate());
  //     let gregorianDate = Cesium.JulianDate.toGregorianDate(dateZone);
  //     let millisecond = Math.round(gregorianDate.millisecond ); //倍速是否小于1，小于1则显示毫秒级
  //     if(Math.abs(viewModel._clockViewModel.multiplier) < 1){
  //         return Cesium.sprintf("%02d:%02d:%02d.%03d",gregorianDate.hour,gregorianDate.minute,gregorianDate.second,gregorianDate.millisecond);
  //     }
  //     return Cesium.sprintf("%02d:%02d:%02d",gregorianDate.hour,gregorianDate.minute,gregorianDate.second);
  // };
  // //设置日期
  // viewer.animation.viewModel.dateFormatter = function(date, viewModel) {
  //     let dateZone = Cesium.JulianDate.addMinutes(date, h, new Cesium.JulianDate());
  //     let gregorianDate = Cesium.JulianDate.toGregorianDate(dateZone); // 设置格式为xx/xx/xx，格式可自定义为任意你想要的
  //     return Cesium.sprintf("%4d-%02d-%02d", gregorianDate.year, gregorianDate.month, gregorianDate.day);
  // }

  //测试，获取cesium点击的坐标
  // const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  // handler.setInputAction((e) => {
  //   debugger;
  //   //查看当前视角的 x,y,z,heading,pitch,roll值
  //   const position = viewer.scene.pickPosition(e.position);
  //   //将笛卡尔坐标转化为经纬度坐标
  //   const cartographic = Cesium.Cartographic.fromCartesian(position);
  //   const x = Cesium.Math.toDegrees(cartographic.longitude);
  //   const y = Cesium.Math.toDegrees(cartographic.latitude);
  //   const z = cartographic.height;
  //   const h = viewer.scene.camera.heading;
  //   const p = viewer.scene.camera.pitch;
  //   const r = viewer.scene.camera.roll;
  //   console.log(x, y, z, h, p, r);
  //   handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});
</script>

<template>
  <div id="cesium-container">
    <section class="back-home">
      <div class="map-btn" @click="
          () => mapController.flyToCoordinates(initCoordinates, orientation)
        ">
        <HomeOutlined />
      </div>
    </section>
    <section class="base-tool-container">
      <div class="map-btn" @click="mapController.zoomIn">
        <PlusOutlined />
      </div>
      <div class="map-btn" @click="mapController.zoomOut">
        <MinusOutlined />
      </div>
    </section>
  </div>
</template>

<style scoped>
#cesium-container {
  height: 100%;
  width: 100%;
  position: relative;
}

#cesium-container:deep(.cesium-viewer-timelineContainer) {
  left: 120px !important;
}

#cesium-container:deep(.cesium-viewer-animationContainer) {
  width: 120px !important;
  height: 80px !important;
}

#cesium-container:deep(.cesium-widget-credits) {
  display: none !important;
  /* 隐藏cesium 标签信息 */
}

#cesium-container:deep(.cesium-viewer-toolbar) {
  right: 324px;
  top: 130px;
}

.base-tool-container {
  top: 10px;
  right: 328px !important;
}

.back-home {
  top: 80px;
  right: 328px !important;
}

.base-tool-container,
.back-home {
  position: absolute;
  z-index: 1;
  right: 20px;
  width: 30px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  /* filter: blur(2px); */
}

.map-btn {
  height: 30px;
  width: 30px;
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  color: #6e6e6e;
  cursor: pointer;
}

.map-btn:hover {
  background-color: #1890ff;
  border-radius: 5px;
  color: #fff;
}

.map-btn:nth-child(even) {
  border-top: 1px solid rgba(110, 110, 110, 0.3);
}
</style>
